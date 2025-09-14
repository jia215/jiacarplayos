from flask import Blueprint, request, jsonify
from src.models.content import db, Content, Playlist, PlayHistory
from src.models.user import User
from datetime import datetime, date
import json

content_bp = Blueprint('content', __name__)

@content_bp.route('/contents', methods=['GET'])
def get_contents():
    """获取内容列表"""
    try:
        # 获取查询参数
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        content_type = request.args.get('type')  # 'audio' or 'video'
        category = request.args.get('category')
        search = request.args.get('search')
        
        # 构建查询
        query = Content.query
        
        if content_type:
            query = query.filter(Content.content_type == content_type)
        
        if category:
            query = query.filter(Content.category == category)
            
        if search:
            query = query.filter(
                db.or_(
                    Content.title.contains(search),
                    Content.artist.contains(search),
                    Content.album.contains(search)
                )
            )
        
        # 分页
        pagination = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        contents = [content.to_dict() for content in pagination.items]
        
        return jsonify({
            'success': True,
            'data': {
                'contents': contents,
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': pagination.total,
                    'pages': pagination.pages,
                    'has_next': pagination.has_next,
                    'has_prev': pagination.has_prev
                }
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取内容列表失败: {str(e)}'
        }), 500

@content_bp.route('/contents/<int:content_id>', methods=['GET'])
def get_content(content_id):
    """获取单个内容详情"""
    try:
        content = Content.query.get_or_404(content_id)
        
        # 增加查看次数
        content.view_count += 1
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': content.to_dict()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取内容详情失败: {str(e)}'
        }), 500

@content_bp.route('/contents', methods=['POST'])
def create_content():
    """创建新内容"""
    try:
        data = request.get_json()
        
        # 验证必需字段
        required_fields = ['title', 'content_type']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'缺少必需字段: {field}'
                }), 400
        
        # 创建内容
        content = Content(
            title=data['title'],
            description=data.get('description'),
            content_type=data['content_type'],
            category=data.get('category'),
            duration=data.get('duration'),
            file_url=data.get('file_url'),
            thumbnail_url=data.get('thumbnail_url'),
            artist=data.get('artist'),
            album=data.get('album'),
            rating=data.get('rating', 0.0)
        )
        
        # 处理发布日期
        if 'release_date' in data and data['release_date']:
            try:
                content.release_date = datetime.strptime(data['release_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({
                    'success': False,
                    'message': '发布日期格式错误，应为 YYYY-MM-DD'
                }), 400
        
        db.session.add(content)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': content.to_dict(),
            'message': '内容创建成功'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'创建内容失败: {str(e)}'
        }), 500

@content_bp.route('/playlists', methods=['GET'])
def get_playlists():
    """获取播放列表"""
    try:
        user_id = request.args.get('user_id', type=int)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        query = Playlist.query
        
        if user_id:
            query = query.filter(Playlist.user_id == user_id)
        else:
            # 只显示公开的播放列表
            query = query.filter(Playlist.is_public == True)
        
        pagination = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        playlists = [playlist.to_dict() for playlist in pagination.items]
        
        return jsonify({
            'success': True,
            'data': {
                'playlists': playlists,
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': pagination.total,
                    'pages': pagination.pages,
                    'has_next': pagination.has_next,
                    'has_prev': pagination.has_prev
                }
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取播放列表失败: {str(e)}'
        }), 500

@content_bp.route('/playlists', methods=['POST'])
def create_playlist():
    """创建播放列表"""
    try:
        data = request.get_json()
        
        # 验证必需字段
        required_fields = ['name', 'user_id']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'缺少必需字段: {field}'
                }), 400
        
        # 验证用户是否存在
        user = User.query.get(data['user_id'])
        if not user:
            return jsonify({
                'success': False,
                'message': '用户不存在'
            }), 404
        
        playlist = Playlist(
            name=data['name'],
            description=data.get('description'),
            user_id=data['user_id'],
            is_public=data.get('is_public', False)
        )
        
        db.session.add(playlist)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': playlist.to_dict(),
            'message': '播放列表创建成功'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'创建播放列表失败: {str(e)}'
        }), 500

@content_bp.route('/playlists/<int:playlist_id>/contents', methods=['POST'])
def add_content_to_playlist(playlist_id):
    """向播放列表添加内容"""
    try:
        data = request.get_json()
        content_id = data.get('content_id')
        
        if not content_id:
            return jsonify({
                'success': False,
                'message': '缺少内容ID'
            }), 400
        
        playlist = Playlist.query.get_or_404(playlist_id)
        content = Content.query.get_or_404(content_id)
        
        # 检查内容是否已在播放列表中
        if content in playlist.contents:
            return jsonify({
                'success': False,
                'message': '内容已在播放列表中'
            }), 400
        
        playlist.contents.append(content)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': '内容已添加到播放列表'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'添加内容到播放列表失败: {str(e)}'
        }), 500

@content_bp.route('/play-history', methods=['POST'])
def record_play_history():
    """记录播放历史"""
    try:
        data = request.get_json()
        
        required_fields = ['user_id', 'content_id']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'缺少必需字段: {field}'
                }), 400
        
        # 验证用户和内容是否存在
        user = User.query.get(data['user_id'])
        content = Content.query.get(data['content_id'])
        
        if not user:
            return jsonify({
                'success': False,
                'message': '用户不存在'
            }), 404
            
        if not content:
            return jsonify({
                'success': False,
                'message': '内容不存在'
            }), 404
        
        play_history = PlayHistory(
            user_id=data['user_id'],
            content_id=data['content_id'],
            play_duration=data.get('play_duration', 0),
            completed=data.get('completed', False)
        )
        
        db.session.add(play_history)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': play_history.to_dict(),
            'message': '播放历史记录成功'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'记录播放历史失败: {str(e)}'
        }), 500

@content_bp.route('/categories', methods=['GET'])
def get_categories():
    """获取内容分类列表"""
    try:
        # 从数据库中获取所有不同的分类
        categories = db.session.query(Content.category).distinct().filter(Content.category.isnot(None)).all()
        category_list = [cat[0] for cat in categories if cat[0]]
        
        return jsonify({
            'success': True,
            'data': category_list
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取分类列表失败: {str(e)}'
        }), 500

@content_bp.route('/trending', methods=['GET'])
def get_trending_content():
    """获取热门内容"""
    try:
        content_type = request.args.get('type')
        limit = request.args.get('limit', 10, type=int)
        
        query = Content.query.order_by(Content.view_count.desc())
        
        if content_type:
            query = query.filter(Content.content_type == content_type)
        
        trending_contents = query.limit(limit).all()
        
        return jsonify({
            'success': True,
            'data': [content.to_dict() for content in trending_contents]
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取热门内容失败: {str(e)}'
        }), 500

