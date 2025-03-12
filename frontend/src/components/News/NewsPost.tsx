import React from "react";
import {BlogResponse} from "../../interfaces/Blog.ts";
// import {useGetAllBlog} from "../../hooks/useBlog.ts";
// import {BlogResponse} from "../../interfaces/Blog.ts";
import "./NewsPost.scss"
import {useNavigate} from "react-router-dom";

const NewsPost: React.FC<{ news: BlogResponse | null}> = ({ news }) => {
    if (!news) return null;
    const navigate = useNavigate();
    return (
        <div className="blog-card" onClick={() => {navigate(`/blog/${news.blogPostId}`)}}>
            <img src={news.imageUrl} alt={news.title} className="blog-image"/>

            <div className="blog-content">
                <p className="blog-meta">
                    By {news.authorName} - {new Date(news.createdAt).toLocaleDateString()}
                </p>
                <div className="blog-text" dangerouslySetInnerHTML={{__html: news.content}}></div>
                <button className="blog-button">Xem thêm</button>
            </div>
        </div>

    );
};

export default NewsPost;
