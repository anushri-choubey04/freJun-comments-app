import React, { useState } from 'react';

function CommentsTable({ comments, posts, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCell, setEditingCell] = useState({});
  const itemsPerPage = 10;

  const getPostTitle = (postId) => {
    const post = posts.find((p) => p.id === postId);
    return post ? post.title : 'Unknown';
  };

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paginatedComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id, field, value) => {
    onEdit(id, field, value);
    setEditingCell({});
  };

  const pageGroupSize = 10;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="overflow-x-auto mt-6 mx-2 sm:mx-8 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-600 p-3 shadow-lg">
        <table className=" w-full min-w-[600px] text-sm sm:text-base divide-y divide-gray-800">
          <thead className="bg-green-200 text-black">
            <tr className="text-base sm:text-lg font-bold">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Email</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Body</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Post</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-400">
            {paginatedComments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-200">
                <td className="px-2 sm:px-4 py-2 break-words">{comment.email}</td>

                <td
                  className="px-2 sm:px-4 py-2 cursor-pointer"
                  onClick={() =>
                    setEditingCell({ id: comment.id, field: 'name' })
                  }
                >
                  {editingCell.id === comment.id &&
                  editingCell.field === 'name' ? (
                    <input
                      autoFocus
                      defaultValue={comment.name}
                      onBlur={(e) =>
                        handleEdit(comment.id, 'name', e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter')
                          handleEdit(comment.id, 'name', e.target.value);
                      }}
                      className="w-full bg-white border border-gray-400 rounded px-2 py-1 focus:ring focus:ring-blue-200"
                    />
                  ) : (
                    comment.name
                  )}
                </td>

                <td
                  className="px-2 sm:px-4 py-2 cursor-pointer"
                  onClick={() =>
                    setEditingCell({ id: comment.id, field: 'body' })
                  }
                >
                  {editingCell.id === comment.id &&
                  editingCell.field === 'body' ? (
                    <input
                      autoFocus
                      defaultValue={comment.body}
                      onBlur={(e) =>
                        handleEdit(comment.id, 'body', e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter')
                          handleEdit(comment.id, 'body', e.target.value);
                      }}
                      className="w-full bg-white border border-gray-300 rounded px-2 py-1 focus:ring focus:ring-blue-200"
                    />
                  ) : (
                    comment.body
                  )}
                </td>

                <td className="px-2 sm:px-4 py-2 text-gray-600">
                  {getPostTitle(comment.postId)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap px-2">
        {startPage > 1 && (
          <button
            className="px-3 py-1 text-sm rounded bg-gray-100 border text-black hover:bg-gray-300"
            onClick={() => setCurrentPage(startPage - 1)}
          >
            &laquo; Prev
          </button>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === page
                ? 'bg-green-600 text-white'
                : 'bg-white border border-gray-300 text-black hover:bg-gray-400'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <button
            className="px-3 py-1 text-sm rounded bg-gray-100 border text-black hover:bg-gray-300"
            onClick={() => setCurrentPage(endPage + 1)}
          >
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentsTable;
