#!/usr/bin/env python3
"""
初始化示例数据脚本
"""
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from src.main import app
from src.models.user import db, User
from src.models.content import Content, Playlist
from datetime import datetime, date

def init_sample_data():
    """初始化示例数据"""
    with app.app_context():
        # 清空现有数据
        db.drop_all()
        db.create_all()
        
        print("正在创建示例用户...")
        # 创建示例用户
        users = [
            User(username='driver1', email='driver1@example.com'),
            User(username='passenger1', email='passenger1@example.com'),
            User(username='admin', email='admin@example.com')
        ]
        
        for user in users:
            user.set_password('password123')
            db.session.add(user)
        
        db.session.commit()
        print(f"已创建 {len(users)} 个用户")
        
        print("正在创建示例内容...")
        # 创建示例音频内容
        audio_contents = [
            {
                'title': '夜曲',
                'description': '周杰伦经典歌曲',
                'content_type': 'audio',
                'category': '流行音乐',
                'duration': 240,
                'artist': '周杰伦',
                'album': '叶惠美',
                'release_date': date(2003, 7, 31),
                'rating': 4.8,
                'file_url': 'https://example.com/audio/nocturne.mp3',
                'thumbnail_url': 'https://example.com/thumbnails/nocturne.jpg'
            },
            {
                'title': '青花瓷',
                'description': '中国风代表作品',
                'content_type': 'audio',
                'category': '流行音乐',
                'duration': 228,
                'artist': '周杰伦',
                'album': '我很忙',
                'release_date': date(2007, 11, 1),
                'rating': 4.9,
                'file_url': 'https://example.com/audio/blue_and_white_porcelain.mp3',
                'thumbnail_url': 'https://example.com/thumbnails/blue_and_white_porcelain.jpg'
            },
            {
                'title': '稻香',
                'description': '温暖治愈的歌曲',
                'content_type': 'audio',
                'category': '流行音乐',
                'duration': 223,
                'artist': '周杰伦',
                'album': '魔杰座',
                'release_date': date(2008, 10, 15),
                'rating': 4.7,
                'file_url': 'https://example.com/audio/rice_fragrance.mp3',
                'thumbnail_url': 'https://example.com/thumbnails/rice_fragrance.jpg'
            },
            {
                'title': 'Shape of You',
                'description': 'Ed Sheeran热门单曲',
                'content_type': 'audio',
                'category': '欧美流行',
                'duration': 233,
                'artist': 'Ed Sheeran',
                'album': '÷ (Divide)',
                'release_date': date(2017, 1, 6),
                'rating': 4.6,
                'file_url': 'https://example.com/audio/shape_of_you.mp3',
                'thumbnail_url': 'https://example.com/thumbnails/shape_of_you.jpg'
            },
            {
                'title': 'Blinding Lights',
                'description': 'The Weeknd经典作品',
                'content_type': 'audio',
                'category': '欧美流行',
                'duration': 200,
                'artist': 'The Weeknd',
                'album': 'After Hours',
                'release_date': date(2019, 11, 29),
                'rating': 4.8,
                'file_url': 'https://example.com/audio/blinding_lights.mp3',
                'thumbnail_url': 'https://example.com/thumbnails/blinding_lights.jpg'
            }
        ]
        
        # 创建示例视频内容
        video_contents = [
            {
                'title': '复仇者联盟：终局之战',
                'description': '漫威超级英雄电影的史诗结局',
                'content_type': 'video',
                'category': '动作电影',
                'duration': 10800,  # 3小时
                'artist': '罗素兄弟',
                'album': '漫威电影宇宙',
                'release_date': date(2019, 4, 26),
                'rating': 4.9,
                'file_url': 'https://example.com/video/avengers_endgame.mp4',
                'thumbnail_url': 'https://example.com/thumbnails/avengers_endgame.jpg'
            },
            {
                'title': '流浪地球',
                'description': '中国科幻电影里程碑',
                'content_type': 'video',
                'category': '科幻电影',
                'duration': 7500,  # 2小时5分钟
                'artist': '郭帆',
                'album': '中国科幻',
                'release_date': date(2019, 2, 5),
                'rating': 4.7,
                'file_url': 'https://example.com/video/wandering_earth.mp4',
                'thumbnail_url': 'https://example.com/thumbnails/wandering_earth.jpg'
            },
            {
                'title': '你的名字',
                'description': '新海诚动画电影代表作',
                'content_type': 'video',
                'category': '动画电影',
                'duration': 6360,  # 1小时46分钟
                'artist': '新海诚',
                'album': '日本动画',
                'release_date': date(2016, 8, 26),
                'rating': 4.8,
                'file_url': 'https://example.com/video/your_name.mp4',
                'thumbnail_url': 'https://example.com/thumbnails/your_name.jpg'
            },
            {
                'title': '肖申克的救赎',
                'description': '经典剧情片，IMDB排名第一',
                'content_type': 'video',
                'category': '剧情电影',
                'duration': 8520,  # 2小时22分钟
                'artist': '弗兰克·德拉邦特',
                'album': '经典电影',
                'release_date': date(1994, 9, 23),
                'rating': 4.9,
                'file_url': 'https://example.com/video/shawshank_redemption.mp4',
                'thumbnail_url': 'https://example.com/thumbnails/shawshank_redemption.jpg'
            }
        ]
        
        all_contents = audio_contents + video_contents
        
        for content_data in all_contents:
            content = Content(**content_data)
            # 随机设置一些播放次数
            content.view_count = hash(content.title) % 1000
            db.session.add(content)
        
        db.session.commit()
        print(f"已创建 {len(all_contents)} 个内容项目")
        
        print("正在创建示例播放列表...")
        # 创建示例播放列表
        playlists = [
            {
                'name': '我的最爱',
                'description': '收藏的经典歌曲',
                'user_id': 1,
                'is_public': True
            },
            {
                'name': '开车必听',
                'description': '适合开车时听的音乐',
                'user_id': 1,
                'is_public': True
            },
            {
                'name': '电影收藏',
                'description': '精选电影合集',
                'user_id': 2,
                'is_public': True
            }
        ]
        
        for playlist_data in playlists:
            playlist = Playlist(**playlist_data)
            db.session.add(playlist)
        
        db.session.commit()
        
        # 为播放列表添加内容
        playlist1 = Playlist.query.filter_by(name='我的最爱').first()
        playlist2 = Playlist.query.filter_by(name='开车必听').first()
        playlist3 = Playlist.query.filter_by(name='电影收藏').first()
        
        # 获取一些内容
        audio_items = Content.query.filter_by(content_type='audio').limit(3).all()
        video_items = Content.query.filter_by(content_type='video').limit(2).all()
        
        if playlist1 and audio_items:
            for item in audio_items[:2]:
                playlist1.contents.append(item)
        
        if playlist2 and audio_items:
            for item in audio_items:
                playlist2.contents.append(item)
        
        if playlist3 and video_items:
            for item in video_items:
                playlist3.contents.append(item)
        
        db.session.commit()
        print(f"已创建 {len(playlists)} 个播放列表")
        
        print("示例数据初始化完成！")
        print("\n用户账户:")
        for user in User.query.all():
            print(f"  用户名: {user.username}, 邮箱: {user.email}, 密码: password123")
        
        print(f"\n内容统计:")
        print(f"  音频: {Content.query.filter_by(content_type='audio').count()} 个")
        print(f"  视频: {Content.query.filter_by(content_type='video').count()} 个")
        print(f"  播放列表: {Playlist.query.count()} 个")

if __name__ == '__main__':
    init_sample_data()

