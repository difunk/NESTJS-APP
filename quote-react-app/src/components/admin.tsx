import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import type { Users } from "../types/user";
import type { Quotes } from "../types/quote";
import { API_BASE_URL } from "../config/api";

type AdminProps = {
  accessToken: string;
};

const AdminComponent: React.FC<AdminProps> = ({ accessToken }) => {
  const [users, setUsers] = useState<Users>([]);
  const [quotes, setQuotes] = useState<Quotes>([]);
  const [activeTab, setActiveTab] = useState<"quotes" | "users">("quotes");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Edit Quote State
  const [editingQuote, setEditingQuote] = useState<string | null>(null);
  const [editQuoteData, setEditQuoteData] = useState({
    quote: "",
    author: "",
    year: new Date().getFullYear(),
  });

  // New Quote Form State
  const [newQuote, setNewQuote] = useState({
    quote: "",
    author: "",
    year: new Date().getFullYear(),
  });

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const usersResult = await axios.get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(usersResult.data);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  const fetchQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const quotesResult = await axios.get(`${API_BASE_URL}/quotes`);
      setQuotes(quotesResult.data);
    } catch {
      setError("Failed to fetch quotes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/quotes`, newQuote, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Reset form and refresh quotes
      setNewQuote({
        quote: "",
        author: "",
        year: new Date().getFullYear(),
      });
      fetchQuotes();
    } catch {
      setError("Failed to create quote");
    }
  };

  const handleDeleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/quotes/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fetchQuotes();
    } catch {
      setError("Failed to delete quote");
    }
  };

  const handleEditQuote = (quote: Quotes[0]) => {
    setEditingQuote(quote.id);
    setEditQuoteData({
      quote: quote.quote,
      author: quote.author,
      year: quote.year,
    });
  };

  const handleUpdateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuote) return;

    try {
      await axios.put(`${API_BASE_URL}/quotes/${editingQuote}`, editQuoteData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setEditingQuote(null);
      setEditQuoteData({
        quote: "",
        author: "",
        year: new Date().getFullYear(),
      });
      fetchQuotes();
    } catch {
      setError("Failed to update quote");
    }
  };

  const handleCancelEdit = () => {
    setEditingQuote(null);
    setEditQuoteData({
      quote: "",
      author: "",
      year: new Date().getFullYear(),
    });
  };

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else {
      fetchQuotes();
    }
  }, [accessToken, activeTab, fetchUsers, fetchQuotes]);

  return (
    <div className="admin-container">
      {error && <div className="error-message">{error}</div>}

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "quotes" ? "active" : ""}`}
          onClick={() => setActiveTab("quotes")}
        >
          Quote Management
        </button>
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
      </div>

      {/* Quotes Tab */}
      {activeTab === "quotes" && (
        <div className="quotes-section">
          <h2>Quote Management</h2>

          {/* Add New Quote Form */}
          <div className="add-quote-form">
            <h3>Add New Quote</h3>
            <form onSubmit={handleCreateQuote}>
              <div className="form-group">
                <label htmlFor="quote">Quote</label>
                <textarea
                  id="quote"
                  value={newQuote.quote}
                  onChange={(e) =>
                    setNewQuote({ ...newQuote, quote: e.target.value })
                  }
                  placeholder="Enter the quote..."
                  required
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    id="author"
                    type="text"
                    value={newQuote.author}
                    onChange={(e) =>
                      setNewQuote({ ...newQuote, author: e.target.value })
                    }
                    placeholder="Author name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <input
                    id="year"
                    type="number"
                    value={newQuote.year}
                    onChange={(e) =>
                      setNewQuote({
                        ...newQuote,
                        year: parseInt(e.target.value),
                      })
                    }
                    min="1000"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Add Quote
              </button>
            </form>
          </div>

          {/* Quotes List */}
          <div className="quotes-list">
            <h3>All Quotes ({quotes.length})</h3>
            {isLoading ? (
              <div className="loading">Loading quotes...</div>
            ) : (
              <div className="quotes-grid">
                {quotes.map((quote) => (
                  <div key={quote.id} className="quote-card">
                    {editingQuote === quote.id ? (
                      // Edit Mode
                      <form
                        onSubmit={handleUpdateQuote}
                        className="edit-quote-form"
                      >
                        <div className="form-group">
                          <label htmlFor={`edit-quote-${quote.id}`}>
                            Quote
                          </label>
                          <textarea
                            id={`edit-quote-${quote.id}`}
                            value={editQuoteData.quote}
                            onChange={(e) =>
                              setEditQuoteData({
                                ...editQuoteData,
                                quote: e.target.value,
                              })
                            }
                            required
                            rows={3}
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor={`edit-author-${quote.id}`}>
                              Author
                            </label>
                            <input
                              id={`edit-author-${quote.id}`}
                              type="text"
                              value={editQuoteData.author}
                              onChange={(e) =>
                                setEditQuoteData({
                                  ...editQuoteData,
                                  author: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor={`edit-year-${quote.id}`}>
                              Year
                            </label>
                            <input
                              id={`edit-year-${quote.id}`}
                              type="number"
                              value={editQuoteData.year}
                              onChange={(e) =>
                                setEditQuoteData({
                                  ...editQuoteData,
                                  year: parseInt(e.target.value),
                                })
                              }
                              min="1000"
                              max={new Date().getFullYear()}
                            />
                          </div>
                        </div>

                        <div className="edit-actions">
                          <button type="submit" className="save-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // View Mode
                      <>
                        <div className="quote-content">
                          <blockquote>"{quote.quote}"</blockquote>
                          <div className="quote-meta">
                            <span className="author">— {quote.author}</span>
                            {quote.year && (
                              <span className="year">({quote.year})</span>
                            )}
                          </div>
                        </div>
                        <div className="quote-actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditQuote(quote)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteQuote(quote.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="users-section">
          <h2>User Management</h2>
          {isLoading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-list">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                  <div className="user-meta">
                    <span className="user-id">ID: {user.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminComponent;
