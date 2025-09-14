from flask import Blueprint, request, jsonify, Response, send_file
from src.models.content import db, Content, PlayHistory
from src.models.user import User
import os
import mimetypes
import re
from urllib.parse import urlparse

streaming_bp = Blueprint('streaming', __name__)

def get_file_range(file_path, range_header):
    """处理HTTP Range请求，支持断点续传"""
    file_size = os.path.getsize(file_path)
    
    if not range_header:
        return 0, file_size - 1, file_size
    
    # 解析Range头
    range_match = re.search(r'bytes=(\d+)-(\d*)', range_header)
    if not range_match:
        return 0, file_size - 1, file_size
    
    start = int(range_match.group(1))
    end = int(range_match.group(2)) if range_match.group(2) else file_size - 1
    
    # 确保范围有效
    start = max(0, min(start, file_size - 1))
    end = max(start, min(end, file_size - 1))
    
    return start, end, file_size

@streaming_bp.route('/stream/<int:content_id>')
def stream_content(content_id):
    """串流内容"""
    try:
        # 获取内容信息
        content = Content.query.get_or_404(content_id)
        
        if not content.file_url:
            return jsonify({
                'success': False,
                'message': '内容文件不存在'
            }), 404
        
        # 解析文件路径
        parsed_url = urlparse(content.file_url)
        if parsed_url.scheme in ['http', 'https']:
            # 如果是网络URL，重定向到原始URL
            return jsonify({
                'success': True,
                'stream_url': content.file_url,
                'content_type': content.content_type
            })
        else:
            # 本地文件处理
            file_path = content.file_url
            if not os.path.exists(file_path):
                return jsonify({
                    'success': False,
                    'message': '文件不存在'
                }), 404
            
            # 获取文件MIME类型
            mime_type, _ = mimetypes.guess_type(file_path)
            if not mime_type:
                if content.content_type == 'video':
                    mime_type = 'video/mp4'
                else:
                    mime_type = 'audio/mpeg'
            
            # 处理Range请求（支持断点续传）
            range_header = request.headers.get('Range')
            start, end, file_size = get_file_range(file_path, range_header)
            
            def generate():
                with open(file_path, 'rb') as f:
                    f.seek(start)
                    remaining = end - start + 1
                    while remaining:
                        chunk_size = min(8192, remaining)
                        chunk = f.read(chunk_size)
                        if not chunk:
                            break
                        remaining -= len(chunk)
                        yield chunk
            
            # 设置响应头
            headers = {
                'Content-Type': mime_type,
                'Accept-Ranges': 'bytes',
                'Content-Length': str(end - start + 1),
                'Cache-Control': 'no-cache'
            }
            
            if range_header:
                headers['Content-Range'] = f'bytes {start}-{end}/{file_size}'
                status_code = 206  # Partial Content
            else:
                status_code = 200
            
            return Response(
                generate(),
                status=status_code,
                headers=headers
            )
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'串流失败: {str(e)}'
        }), 500

@streaming_bp.route('/stream-info/<int:content_id>')
def get_stream_info(content_id):
    """获取串流信息"""
    try:
        content = Content.query.get_or_404(content_id)
        
        # 构建串流URL
        stream_url = f'/api/stream/{content_id}'
        
        # 获取文件信息
        file_info = {}
        if content.file_url and not urlparse(content.file_url).scheme:
            # 本地文件
            if os.path.exists(content.file_url):
                file_info = {
                    'file_size': os.path.getsize(content.file_url),
                    'supports_range': True
                }
        
        return jsonify({
            'success': True,
            'data': {
                'content_id': content_id,
                'stream_url': stream_url,
                'content_type': content.content_type,
                'title': content.title,
                'duration': content.duration,
                'thumbnail_url': content.thumbnail_url,
                'file_info': file_info
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取串流信息失败: {str(e)}'
        }), 500

@streaming_bp.route('/hls/<int:content_id>/playlist.m3u8')
def hls_playlist(content_id):
    """生成HLS播放列表（简化版本）"""
    try:
        content = Content.query.get_or_404(content_id)
        
        if not content.file_url:
            return jsonify({
                'success': False,
                'message': '内容文件不存在'
            }), 404
        
        # 简化的HLS播放列表
        # 在实际应用中，需要使用FFmpeg等工具将视频切片
        playlist_content = f"""#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.0,
/api/stream/{content_id}
#EXT-X-ENDLIST
"""
        
        return Response(
            playlist_content,
            mimetype='application/vnd.apple.mpegurl',
            headers={
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            }
        )
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'生成HLS播放列表失败: {str(e)}'
        }), 500

@streaming_bp.route('/quality-levels/<int:content_id>')
def get_quality_levels(content_id):
    """获取可用的质量级别"""
    try:
        content = Content.query.get_or_404(content_id)
        
        # 模拟不同质量级别
        # 在实际应用中，这些应该是预先编码的不同质量版本
        quality_levels = []
        
        if content.content_type == 'video':
            quality_levels = [
                {
                    'quality': '1080p',
                    'bitrate': 5000,
                    'resolution': '1920x1080',
                    'stream_url': f'/api/stream/{content_id}?quality=1080p'
                },
                {
                    'quality': '720p',
                    'bitrate': 2500,
                    'resolution': '1280x720',
                    'stream_url': f'/api/stream/{content_id}?quality=720p'
                },
                {
                    'quality': '480p',
                    'bitrate': 1000,
                    'resolution': '854x480',
                    'stream_url': f'/api/stream/{content_id}?quality=480p'
                }
            ]
        else:  # audio
            quality_levels = [
                {
                    'quality': 'High',
                    'bitrate': 320,
                    'format': 'MP3',
                    'stream_url': f'/api/stream/{content_id}?quality=high'
                },
                {
                    'quality': 'Medium',
                    'bitrate': 192,
                    'format': 'MP3',
                    'stream_url': f'/api/stream/{content_id}?quality=medium'
                },
                {
                    'quality': 'Low',
                    'bitrate': 128,
                    'format': 'MP3',
                    'stream_url': f'/api/stream/{content_id}?quality=low'
                }
            ]
        
        return jsonify({
            'success': True,
            'data': {
                'content_id': content_id,
                'content_type': content.content_type,
                'quality_levels': quality_levels
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'获取质量级别失败: {str(e)}'
        }), 500

@streaming_bp.route('/playback-session', methods=['POST'])
def start_playback_session():
    """开始播放会话"""
    try:
        data = request.get_json()
        
        required_fields = ['user_id', 'content_id']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'缺少必需字段: {field}'
                }), 400
        
        user_id = data['user_id']
        content_id = data['content_id']
        
        # 验证用户和内容
        user = User.query.get(user_id)
        content = Content.query.get(content_id)
        
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
        
        # 创建播放历史记录
        play_history = PlayHistory(
            user_id=user_id,
            content_id=content_id,
            play_duration=0,
            completed=False
        )
        
        db.session.add(play_history)
        db.session.commit()
        
        # 增加播放次数
        content.view_count += 1
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': {
                'session_id': play_history.id,
                'content': content.to_dict(),
                'stream_info': {
                    'stream_url': f'/api/stream/{content_id}',
                    'hls_url': f'/api/hls/{content_id}/playlist.m3u8'
                }
            },
            'message': '播放会话已开始'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'开始播放会话失败: {str(e)}'
        }), 500

@streaming_bp.route('/playback-session/<int:session_id>', methods=['PUT'])
def update_playback_session(session_id):
    """更新播放会话（记录播放进度）"""
    try:
        data = request.get_json()
        
        play_history = PlayHistory.query.get_or_404(session_id)
        
        if 'play_duration' in data:
            play_history.play_duration = data['play_duration']
        
        if 'completed' in data:
            play_history.completed = data['completed']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': play_history.to_dict(),
            'message': '播放会话已更新'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'更新播放会话失败: {str(e)}'
        }), 500

