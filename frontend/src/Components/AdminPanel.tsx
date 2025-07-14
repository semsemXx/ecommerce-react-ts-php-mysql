import React, { useState } from 'react';

interface Game {
  id: number;
  name: string;
  image: string;
  headerText?: string;
  description?: string;
  price?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface CartItem {
  id: number;
  gameId: number;
  gameName: string;
  quantity: number;
  price: number;
}

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState('games');
  
  const [games, setGames] = useState<Game[]>([
    { id: 5, name: "Assassin's Creed Shadows", image: "/placeholder-game.jpg" },
    { id: 6, name: "Assassin's Creed Shadows", image: "/placeholder-game.jpg" },
    { id: 70705, name: "Assassin's Creed Shadows", image: "/placeholder-game.jpg" }
  ]);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, gameId: 5, gameName: "Assassin's Creed Shadows", quantity: 1, price: 59.99 },
    { id: 2, gameId: 6, gameName: "Assassin's Creed Shadows", quantity: 2, price: 59.99 }
  ]);
  
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: "john_doe", email: "john@example.com", role: "customer" },
    { id: 2, username: "jane_smith", email: "jane@example.com", role: "admin" }
  ]);
  
  const [showGameForm, setShowGameForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const handleDeleteGame = (id: number) => {
    setGames(games.filter(game => game.id !== id));
  };
  
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };
  
  const handleUpdateGame = (id: number) => {
    const gameToEdit = games.find(game => game.id === id);
    if (gameToEdit) {
      setEditingGame(gameToEdit);
      setShowGameForm(true);
    }
  };
  
  const handleUpdateUser = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setShowUserForm(true);
    }
  };

  const GameForm = ({ editGame }: { editGame: Game | null }) => {
    const isEditing = Boolean(editGame);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission logic here
      setShowGameForm(false);
      setEditingGame(null);
    };
    
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{isEditing ? 'Edit Game' : 'New Game'}</h2>
          <form className="game-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="headerText">Header Text</label>
              <input 
                type="text" 
                id="headerText" 
                placeholder="Enter game header text" 
                defaultValue={editGame?.headerText || ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter game name" 
                defaultValue={editGame?.name || ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                placeholder="Enter game description"
                defaultValue={editGame?.description || ''}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input 
                type="text" 
                id="price" 
                placeholder="Enter game price" 
                defaultValue={editGame?.price || ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <div className="image-upload-container">
                <div className="image-placeholder">
                  {editGame?.image ? (
                    <img src={editGame.image} alt="Game thumbnail" className="preview-image" />
                  ) : (
                    <>
                      <span>+</span>
                      <p>Upload image</p>
                    </>
                  )}
                </div>
                <input type="file" id="image" accept="image/*" className="image-input" />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save</button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                  setShowGameForm(false);
                  setEditingGame(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  const UserForm = ({ editUser }: { editUser: User | null }) => {
    const isEditing = Boolean(editUser);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission logic here
      setShowUserForm(false);
      setEditingUser(null);
    };
    
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{isEditing ? 'Edit User' : 'New User'}</h2>
          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter username" 
                defaultValue={editUser?.username || ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter email" 
                defaultValue={editUser?.email || ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                id="role" 
                defaultValue={editUser?.role || 'customer'}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save</button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                  setShowUserForm(false);
                  setEditingUser(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderPanelContent = () => {
    switch(activePanel) {
      case 'games':
        return (
          <div className="panel-content">
            <div className="panel-header">
              <h1>Games Management</h1>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setEditingGame(null);
                  setShowGameForm(true);
                }}
              >
                NEW GAME
              </button>
            </div>
            <div className="table-container">
              <div className="table-header">
                <div className="table-cell image-col">Image</div>
                <div className="table-cell id-col">ID</div>
                <div className="table-cell name-col">Name</div>
                <div className="table-cell actions-col">Actions</div>
              </div>
              {games.map(game => (
                <div className="table-row" key={game.id}>
                  <div className="table-cell image-col">
                    <div className="game-thumbnail">
                      <img src={game.image} alt={game.name} />
                    </div>
                  </div>
                  <div className="table-cell id-col">{game.id}</div>
                  <div className="table-cell name-col">{game.name}</div>
                  <div className="table-cell actions-col">
                    <button 
                      className="btn-update" 
                      onClick={() => handleUpdateGame(game.id)}
                    >
                      UPDATE
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDeleteGame(game.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cart':
        return (
          <div className="panel-content">
            <div className="panel-header">
              <h1>Cart Items</h1>
            </div>
            <div className="table-container">
              <div className="table-header">
                <div className="table-cell id-col">ID</div>
                <div className="table-cell name-col">Game</div>
                <div className="table-cell quantity-col">Quantity</div>
                <div className="table-cell price-col">Price</div>
                <div className="table-cell total-col">Total</div>
              </div>
              {cartItems.map(item => (
                <div className="table-row" key={item.id}>
                  <div className="table-cell id-col">{item.id}</div>
                  <div className="table-cell name-col">{item.gameName}</div>
                  <div className="table-cell quantity-col">{item.quantity}</div>
                  <div className="table-cell price-col">${item.price.toFixed(2)}</div>
                  <div className="table-cell total-col">${(item.quantity * item.price).toFixed(2)}</div>
                </div>
              ))}
              <div className="table-footer">
                <div className="cart-total">
                  Total: ${cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="panel-content">
            <div className="panel-header">
              <h1>User Management</h1>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setEditingUser(null);
                  setShowUserForm(true);
                }}
              >
                NEW USER
              </button>
            </div>
            <div className="table-container">
              <div className="table-header">
                <div className="table-cell id-col">ID</div>
                <div className="table-cell name-col">Username</div>
                <div className="table-cell email-col">Email</div>
                <div className="table-cell role-col">Role</div>
                <div className="table-cell actions-col">Actions</div>
              </div>
              {users.map(user => (
                <div className="table-row" key={user.id}>
                  <div className="table-cell id-col">{user.id}</div>
                  <div className="table-cell name-col">{user.username}</div>
                  <div className="table-cell email-col">{user.email}</div>
                  <div className="table-cell role-col">{user.role}</div>
                  <div className="table-cell actions-col">
                    <button 
                      className="btn-update" 
                      onClick={() => handleUpdateUser(user.id)}
                    >
                      UPDATE
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Select a panel</div>;
    }
  };

  return (
    <>
      <style>
        {`
        /* General styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        body {
          background-color: #14151a;
          color: #ffffff;
        }

        /* Admin panel layout */
        .admin-panel {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar styles */
        .sidebar {
          width: 60px;
          background-color: #1a1b21;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
        }

        .sidebar-item {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 15px;
          font-size: 12px;
          color: #8d8e92;
          text-align: center;
          word-break: break-word;
        }

        .sidebar-item.active {
          background-color: #262730;
          color: #ffffff;
        }

        /* Content area */
        .content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        h1, h2 {
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Panel header */
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        /* Table styles */
        .table-container {
          background-color: #1a1b21;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: flex;
          background-color: #262730;
          padding: 12px 16px;
          font-weight: 500;
        }

        .table-row {
          display: flex;
          padding: 12px 16px;
          border-bottom: 1px solid #262730;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-cell {
          display: flex;
          align-items: center;
        }

        .image-col {
          width: 15%;
        }

        .id-col {
          width: 10%;
        }

        .name-col {
          width: 30%;
        }

        .email-col {
          width: 20%;
        }

        .role-col {
          width: 10%;
        }

        .quantity-col, .price-col, .total-col {
          width: 15%;
        }

        .actions-col {
          width: 25%;
          justify-content: flex-end;
          gap: 10px;
        }

        .game-thumbnail {
          width: 80px;
          height: 45px;
          border-radius: 4px;
          overflow: hidden;
        }

        .game-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .table-footer {
          display: flex;
          justify-content: flex-end;
          padding: 16px;
          background-color: #262730;
        }

        .cart-total {
          font-weight: 500;
        }

        /* Button styles */
        .btn-primary {
          padding: 8px 16px;
          background-color: #5865f2;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .btn-secondary {
          padding: 8px 16px;
          background-color: #33353e;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .btn-update {
          padding: 6px 12px;
          background-color: #33353e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        .btn-delete {
          padding: 6px 12px;
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        .btn-primary:hover {
          background-color: #4752c4;
        }

        .btn-secondary:hover {
          background-color: #43454e;
        }

        .btn-update:hover {
          background-color: #43454e;
        }

        .btn-delete:hover {
          background-color: #c0392b;
        }

        /* Form styles */
        .game-form, .user-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          margin-bottom: 8px;
          color: #ffffff;
        }

        input, textarea, select {
          width: 100%;
          padding: 12px 15px;
          border-radius: 6px;
          border: 1px solid #33353e;
          background-color: #1e1f26;
          color: #ffffff;
          font-size: 14px;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5l-6-6L3.5 4 8 8.5 12.5 4 14 5.5l-6 6z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        input::placeholder, textarea::placeholder {
          color: #6c6e78;
        }
        
        /* Image upload styles */
        .image-upload-container {
          position: relative;
          margin-top: 10px;
        }
        
        .image-placeholder {
          width: 100%;
          height: 200px;
          border: 2px dashed #33353e;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background-color: #1e1f26;
          color: #6c6e78;
          overflow: hidden;
        }
        
        .image-placeholder span {
          font-size: 36px;
          margin-bottom: 8px;
        }
        
        .image-placeholder p {
          font-size: 14px;
        }
        
        .image-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #1a1b21;
          width: 90%;
          max-width: 600px;
          border-radius: 8px;
          padding: 24px;
        }

        .modal-content h2 {
          margin-bottom: 20px;
        }

        /* Scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1b21;
        }

        ::-webkit-scrollbar-thumb {
          background: #33353e;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #43454e;
        }
        `}
      </style>
      <div className="admin-panel">
        <div className="sidebar">
          <div 
            className={`sidebar-item ${activePanel === 'games' ? 'active' : ''}`}
            onClick={() => setActivePanel('games')}
          >
            Games
          </div>
          <div 
            className={`sidebar-item ${activePanel === 'cart' ? 'active' : ''}`}
            onClick={() => setActivePanel('cart')}
          >
            Cart
          </div>
          <div 
            className={`sidebar-item ${activePanel === 'users' ? 'active' : ''}`}
            onClick={() => setActivePanel('users')}
          >
            Users
          </div>
        </div>
        <div className="content">
          {renderPanelContent()}
        </div>
      </div>
      
      {showGameForm && <GameForm editGame={editingGame} />}
      {showUserForm && <UserForm editUser={editingUser} />}
    </>
  );
};

export default AdminDashboard; 