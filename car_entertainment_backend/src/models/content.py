from src.models.user import db
from datetime import datetime

class Content(db.Model):
    """内容模型 - 存储音视频内容信息"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    content_type = db.Column(db.String(20), nullable=False)  # 'audio' or 'video'
    category = db.Column(db.String(50))  # 分类：音乐、电影、电视剧等
    duration = db.Column(db.Integer)  # 时长（秒）
    file_url = db.Column(db.String(500))  # 文件URL
    thumbnail_url = db.Column(db.String(500))  # 缩略图URL
    artist = db.Column(db.String(100))  # 艺术家/演员
    album = db.Column(db.String(100))  # 专辑/系列
    release_date = db.Column(db.Date)
    rating = db.Column(db.Float, default=0.0)  # 评分
    view_count = db.Column(db.Integer, default=0)  # 播放次数
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """转换为字典格式"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'content_type': self.content_type,
            'category': self.category,
            'duration': self.duration,
            'file_url': self.file_url,
            'thumbnail_url': self.thumbnail_url,
            'artist': self.artist,
            'album': self.album,
            'release_date': self.release_date.isoformat() if self.release_date else None,
            'rating': self.rating,
            'view_count': self.view_count,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Playlist(db.Model):
    """播放列表模型"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 多对多关系：播放列表包含多个内容
    contents = db.relationship('Content', secondary='playlist_content', backref='playlists')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'is_public': self.is_public,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'content_count': len(self.contents)
        }

# 播放列表和内容的关联表
playlist_content = db.Table('playlist_content',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id'), primary_key=True),
    db.Column('content_id', db.Integer, db.ForeignKey('content.id'), primary_key=True),
    db.Column('added_at', db.DateTime, default=datetime.utcnow)
)

class PlayHistory(db.Model):
    """播放历史模型"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    played_at = db.Column(db.DateTime, default=datetime.utcnow)
    play_duration = db.Column(db.Integer, default=0)  # 播放时长（秒）
    completed = db.Column(db.Boolean, default=False)  # 是否播放完成
    
    # 关系
    content = db.relationship('Content', backref='play_histories')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content_id': self.content_id,
            'played_at': self.played_at.isoformat(),
            'play_duration': self.play_duration,
            'completed': self.completed,
            'content': self.content.to_dict() if self.content else None
        }

