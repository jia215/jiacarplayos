from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import uuid
from datetime import datetime
from ..models.content import Content
from .. import db

content_management_bp = Blueprint('content_management', __name__)

# 允许的文件扩展名
ALLOWED_EXTENSIONS = {
    'audio': {'mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg'},
    'video': {'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'}
}

def allowed_file(filename, content_type):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS.get(content_type, set())

def get_file_type(filename):
    if not filename or '.' not in filename:
        return None
    
    ext = filename.rsplit('.', 1)[1].lower()
    if ext in ALLOWED_EXTENSIONS['audio']:
        return 'audio'
    elif ext in ALLOWED_EXTENSIONS['video']:
        return 'video'
    return None

@content_management_bp.route('/add-content', methods=['POST'])
def add_content():
    """添加新内容"""
    try:
        # 检查是否是文件上传
        if 'file' in request.files:
            return handle_file_upload()
        else:
            return handle_url_content()
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'添加内容失败: {str(e)}'
        }), 500

def handle_file_upload():
    """处理文件上传"""
    file = request.files['file']
    if file.filename == '':
        return jsonify({
            'success': False,
            'message': '未选择文件'
        }), 400

    # 获取其他表单数据
    title = request.form.get('title', '')
    artist = request.form.get('artist', '')
    category = request.form.get('category', '')
    description = request.form.get('description', '')

    # 确定文件类型
    content_type = get_file_type(file.filename)
    if not content_type:
        return jsonify({
            'success': False,
            'message': '不支持的文件格式'
        }), 400

    if not allowed_file(file.filename, content_type):
        return jsonify({
            'success': False,
            'message': f'不支持的{content_type}文件格式'
        }), 400

    # 生成唯一文件名
    file_extension = file.filename.rsplit('.', 1)[1].lower()
    unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
    
    # 创建上传目录
    upload_dir = os.path.join('uploads', content_type)
    os.makedirs(upload_dir, exist_ok=True)
    
    # 保存文件
    file_path = os.path.join(upload_dir, unique_filename)
    file.save(file_path)

    # 如果没有提供标题，使用文件名
    if not title:
        title = file.filename.rsplit('.', 1)[0]

    # 创建数据库记录
    content = Content(
        title=title,
        artist=artist or 'Unknown',
        file_path=file_path,
        content_type=content_type,
        category=category or 'Other',
        description=description,
        duration=0,  # 可以后续通过媒体库获取实际时长
        file_size=os.path.getsize(file_path),
        created_at=datetime.utcnow()
    )

    db.session.add(content)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': '文件上传成功',
        'data': {
            'id': content.id,
            'title': content.title,
            'content_type': content.content_type,
            'file_path': content.file_path
        }
    })

def handle_url_content():
    """处理URL内容添加"""
    data = request.get_json()
    
    if not data:
        return jsonify({
            'success': False,
            'message': '请提供内容信息'
        }), 400

    required_fields = ['title', 'url', 'content_type']
    for field in required_fields:
        if not data.get(field):
            return jsonify({
                'success': False,
                'message': f'缺少必需字段: {field}'
            }), 400

    # 验证内容类型
    if data['content_type'] not in ['audio', 'video']:
        return jsonify({
            'success': False,
            'message': '内容类型必须是 audio 或 video'
        }), 400

    # 创建数据库记录
    content = Content(
        title=data['title'],
        artist=data.get('artist', 'Unknown'),
        file_path=data['url'],  # 对于URL内容，file_path存储URL
        content_type=data['content_type'],
        category=data.get('category', 'Other'),
        description=data.get('description', ''),
        duration=data.get('duration', 0),
        file_size=0,  # URL内容无文件大小
        created_at=datetime.utcnow()
    )

    db.session.add(content)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'URL内容添加成功',
        'data': {
            'id': content.id,
            'title': content.title,
            'content_type': content.content_type,
            'url': content.file_path
        }
    })

@content_management_bp.route('/delete-content/<int:content_id>', methods=['DELETE'])
def delete_content(content_id):
    """删除内容"""
    try:
        content = Content.query.get(content_id)
        if not content:
            return jsonify({
                'success': False,
                'message': '内容不存在'
            }), 404

        # 如果是本地文件，删除文件
        if content.file_path and not content.file_path.startswith('http'):
            if os.path.exists(content.file_path):
                os.remove(content.file_path)

        # 删除数据库记录
        db.session.delete(content)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': '内容删除成功'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'删除内容失败: {str(e)}'
        }), 500

@content_management_bp.route('/update-content/<int:content_id>', methods=['PUT'])
def update_content(content_id):
    """更新内容信息"""
    try:
        content = Content.query.get(content_id)
        if not content:
            return jsonify({
                'success': False,
                'message': '内容不存在'
            }), 404

        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': '请提供更新数据'
            }), 400

        # 更新允许的字段
        updatable_fields = ['title', 'artist', 'category', 'description']
        for field in updatable_fields:
            if field in data:
                setattr(content, field, data[field])

        db.session.commit()

        return jsonify({
            'success': True,
            'message': '内容更新成功',
            'data': {
                'id': content.id,
                'title': content.title,
                'artist': content.artist,
                'category': content.category,
                'description': content.description
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'更新内容失败: {str(e)}'
        }), 500

@content_management_bp.route('/content-categories', methods=['GET'])
def get_content_categories():
    """获取所有内容分类"""
    try:
        categories = db.session.query(Content.category).distinct().all()
        category_list = [cat[0] for cat in categories if cat[0]]
        
        return jsonify({
            'success': True,
            'data': {
                'categories': category_list
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取分类失败: {str(e)}'
        }), 500

