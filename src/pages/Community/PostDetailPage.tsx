import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import {
  getPostById,
  createComment,
  updateComment,
  deleteComment,
  updatePost,
  deletePost,
  PostDetailDto,
  CommentDto,
} from "../../api/communityApi.ts";
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
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const accessToken: string | null = localStorage.getItem("accessToken");
  const navigate = useNavigate();

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

  const handleEditPost = () => {
    if (!post) return;
    setIsEditingPost(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleCancelEdit = () => {
    setIsEditingPost(false);
  };

  const handleSubmitEdit = async () => {
    if (!post || !accessToken) return;
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await updatePost(post.postId, accessToken, {
        title: editedTitle,
        content: editedContent,
        postCategory: post.postCategory,
      });
      setIsEditingPost(false);
      fetchPostDetail();
    } catch {
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const handleDeletePost = async () => {
    if (!post || !accessToken) return;

    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deletePost(post.postId, accessToken);
      alert("게시글이 삭제되었습니다.");
      navigate("/community"); 
    } catch {
      alert("게시글 삭제에 실패했습니다.");
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
            {isEditingPost ? (
              <>
                <input
                  type="text"
                  className="section-title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <hr className="section-divider" />
                <div className="post-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    {postCategoryMapping[post.postCategory] || post.postCategory} |{" "}
                    {post.authorNickname} | {formatDateTime(post.createdAt)}
                  </div>
                  {post.isMyPost && (
                    <div>
                      <button
                        className="icon-button"
                        onClick={handleSubmitEdit}
                        aria-label="게시글 수정 완료"
                        title="수정 완료"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="icon-button"
                        onClick={handleCancelEdit}
                        aria-label="게시글 수정 취소"
                        title="취소"
                        style={{ marginLeft: "8px", color: "#6c757d" }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <textarea
                  className="comment-textarea"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2 className="section-title">{post.title}</h2>
                <hr className="section-divider" />
                <div className="post-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    {postCategoryMapping[post.postCategory] || post.postCategory} |{" "}
                    {post.authorNickname} | {formatDateTime(post.createdAt)}
                  </div>
                  {post.isMyPost && (
                    <div>
                      <button
                        className="icon-button"
                        onClick={handleEditPost}
                        aria-label="게시글 수정"
                        title="수정"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="icon-button"
                        onClick={handleDeletePost}
                        aria-label="게시글 삭제"
                        title="삭제"
                        style={{ marginLeft: "8px" }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="post-content-box">
                  <p className="post-content">{post.content}</p>
                </div>
              </>
            )}

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

                  {comment.myComment && editCommentId !== comment.commentId && (
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
                          color: "#007bff",
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
                          color: "#007bff",
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