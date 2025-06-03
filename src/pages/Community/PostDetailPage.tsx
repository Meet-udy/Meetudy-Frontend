import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getPostById, createComment, updateComment, deleteComment, PostDetailDto, CommentDto } from "../../api/communityApi.ts";
import { Header } from "../../components/layout/Header.tsx";
import { postCategoryMapping } from "../../constants/postCategoryMapping.ts";
import { formatDateTime } from "../../utils/dateUtils.ts";

import "./PostDetailPage.css";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetailDto | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const accessToken: string | null = localStorage.getItem("accessToken");

  const fetchPostDetail = async () => {
    if (!accessToken) {
      setError("사용자 토큰이 필요합니다.");
      return;
    }

    try {
      const data = await getPostById(Number(postId), accessToken);
      setPost(data);
      setComments(data.comments); 
    } catch {
      setError("게시글을 불러오는 데 실패했습니다.");
    }
  };

  const handleAddComment = async () => {
    if (!accessToken) {
      setError("사용자 토큰이 필요합니다.");
      return;
    }

    if (!newComment.trim()) return;
    
    try {
      await createComment(Number(postId), accessToken, { content: newComment });
      setNewComment("");
      fetchPostDetail();
    } catch {
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!accessToken) {
      setError("사용자 토큰이 필요합니다.");
      return;
    }

    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await updateComment(commentId, accessToken, { content: editContent });
      setEditCommentId(null);
      setEditContent("");
      fetchPostDetail();
    } catch {
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!accessToken) {
      setError("사용자 토큰이 필요합니다.");
      return;
    }

    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment(commentId, accessToken);
      fetchPostDetail();
    } catch {
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  return (
    <div>
      <Header />
      <hr className="top-divider" />
      <div className="post-detail-wrapper">
        {post && (
          <>
            <h2 className="section-title">{post.title}</h2> 
            <hr className="section-divider" />
            <div className="post-meta">
              {postCategoryMapping[post.postCategory] || post.postCategory} |{" "}
              {post.authorNickname} | {formatDateTime(post.createdAt)}
            </div>
            <div className="post-content-box">
              <p className="post-content">{post.content}</p>
            </div>

            <div className="comment-input-wrapper">
              <textarea
                className="comment-textarea"
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="comment-submit-button" onClick={handleAddComment}>
                댓글 작성
              </button>
            </div>

            <h4 className="comment-title">댓글 {comments.length}개</h4>
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment.commentId} className="comment-item">
                  <div className="comment-author">{comment.authorNickname}</div>

                  {editCommentId === comment.commentId ? (
                    <>
                      <textarea
                        className="comment-textarea"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <button
                        className="comment-submit-button"
                        onClick={() => handleUpdateComment(comment.commentId)}
                      >
                        수정 완료
                      </button>
                    </>
                  ) : (
                    <div className="comment-content">{comment.content}</div>
                  )}

                  <div className="comment-date">{formatDateTime(comment.createdAt)}</div>

                  {comment.mine && editCommentId !== comment.commentId && (
                    <div className="comment-actions">
                      <button
                        className="comment-submit-button"
                        onClick={() => {
                          setEditCommentId(comment.commentId);
                          setEditContent(comment.content);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "8px",
                          fontSize: "1rem",
                          color: "#007bff"
                        }}
                        aria-label="수정"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>

                      <button
                        className="comment-submit-button"
                        onClick={() => handleDeleteComment(comment.commentId)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1rem",
                          color: "#007bff"
                        }}
                        aria-label="삭제"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage; 