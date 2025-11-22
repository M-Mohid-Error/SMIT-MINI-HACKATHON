
// let posts = JSON.parse(localStorage.getItem("posts")) || [];
// let currentUser = JSON.parse(localStorage.getItem("currentUser"));
// let postIdToDelete = null;

// document.addEventListener("DOMContentLoaded", () => {
//   updateAuthUI();
//   renderHomePage();
// });


// function updateAuthUI() {
//   const authButtons = document.getElementById("auth-buttons");
//   if (currentUser) {
//     authButtons.innerHTML = `
//       <span class="navbar-text me-3">
//         <span class="welcome-badge">Welcome, ${currentUser.name}!</span>
//       </span>
//       <button class="btn-logout" onclick="logout()">Logout</button>
//     `;
//   } else {
//     authButtons.innerHTML = `
//       <button class="btn btn-outline-light me-2" onclick="openLoginModal()">Login</button>
//       <button class="btn btn-light" onclick="openSignupModal()">Sign Up</button>
//     `;
//   }
// }

// function showHomePage() {
//   document.getElementById("home-page").classList.remove("d-none");
//   document.getElementById("dashboard-page").classList.add("d-none");
//   renderHomePage();
// }

// function showDashboard() {
//   if (!currentUser) {
//     openLoginModal();
//     return;
//   }
//   document.getElementById("home-page").classList.add("d-none");
//   document.getElementById("dashboard-page").classList.remove("d-none");
//   renderUserPosts();
// }

// function openLoginModal() {
//   const signupModal = bootstrap.Modal.getInstance(
//     document.getElementById("signupModal")
//   );
//   if (signupModal) signupModal.hide();
//   new bootstrap.Modal(document.getElementById("loginModal")).show();
// }

// function openSignupModal() {
//   const loginModal = bootstrap.Modal.getInstance(
//     document.getElementById("loginModal")
//   );
//   if (loginModal) loginModal.hide();
//   new bootstrap.Modal(document.getElementById("signupModal")).show();
// }

// function switchToSignup() {
//   bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
//   openSignupModal();
// }

// function switchToLogin() {
//   bootstrap.Modal.getInstance(document.getElementById("signupModal")).hide();
//   openLoginModal();
// }

// function openLoginFromPrompt() {
//   bootstrap.Modal.getInstance(
//     document.getElementById("likePromptModal")
//   ).hide();
//   openLoginModal();
// }

// function handleLogin() {
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value;
//   if (!email || !password) {
//     alert("Please fill all fields");
//     return;
//   }

//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   const user = users.find((u) => u.email === email && u.password === password);

//   if (user) {
//     currentUser = user;
//     localStorage.setItem("currentUser", JSON.stringify(user));
//     updateAuthUI();
//     bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
//     showDashboard();
//   } else {
//     alert("Invalid email or password");
//   }
// }

// function handleSignup() {
//   const name = document.getElementById("signupName").value.trim();
//   const email = document.getElementById("signupEmail").value.trim();
//   const password = document.getElementById("signupPassword").value;
//   if (!name || !email || !password) {
//     alert("All fields are required");
//     return;
//   }

//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   if (users.some((u) => u.email === email)) {
//     alert("Email already exists!");
//     return;
//   }

//   users.push({ name, email, password });
//   localStorage.setItem("users", JSON.stringify(users));
//   alert("Account created! Please log in.");
//   switchToLogin();
// }

// function getAuthorNameByEmail(email) {
//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   const user = users.find((u) => u.email === email);
//   return user ? user.name : "Deleted User";
// }

// function renderHomePage() {
//   const feed = document.getElementById("posts-feed");
//   feed.innerHTML = "";

//   if (posts.length === 0) {
//     feed.innerHTML = `
//       <div class="col-12">
//         <div class="alert alert-info text-center rounded-3">
//           No posts yet. Be the first to share!
//         </div>
//       </div>
//     `;
//     return;
//   }

//   const sorted = [...posts].sort((a, b) => b.timestamp - a.timestamp);
//   sorted.forEach((post) => {
//     const authorName = getAuthorNameByEmail(post.authorEmail);
//     const card = createPostCard(post, authorName, false);
//     feed.appendChild(card);
//   });
// }

// function renderUserPosts() {
//   const feed = document.getElementById("user-posts-feed");
//   feed.innerHTML = "";

//   if (!currentUser) return;

//   const userPosts = posts.filter((p) => p.authorEmail === currentUser.email);
//   if (userPosts.length === 0) {
//     feed.innerHTML = `
//       <div class="col-12">
//         <div class="alert alert-warning text-center rounded-3">
//           You haven't posted anything yet.
//         </div>
//       </div>
//     `;
//     return;
//   }

//   const sorted = [...userPosts].sort((a, b) => b.timestamp - a.timestamp);
//   sorted.forEach((post) => {
//     const card = createPostCard(post, currentUser.name, true);
//     feed.appendChild(card);
//   });
// }

// function createPostCard(post, authorName, showEditDelete) {
//   const col = document.createElement("div");
//   col.className = "col-md-6 col-lg-4";

//   const date = new Date(post.timestamp).toLocaleString();
//   const imgHtml = post.imageUrl
//     ? `<img src="${post.imageUrl}" class="post-image" onerror="this.style.display='none'">`
//     : "";

//   const isLikedByUser =
//     currentUser && post.likedBy?.includes(currentUser.email);

//   col.innerHTML = `
//     <div class="card post-card h-100 shadow-sm">
//       <div class="card-body d-flex flex-column">
//         <h5 class="post-heading">${post.heading || "Untitled"}</h5>
//         <p class="post-description">${post.description}</p>
//         ${imgHtml}
//         <div class="mt-auto">
//           <div class="post-meta">
//             By: <span class="post-author">${authorName}</span> • ${date}
//           </div>
//           <div class="d-flex align-items-center mt-2">
//             <button class="like-btn ${
//               isLikedByUser ? "liked" : ""
//             }" onclick="toggleLike(${post.id})">
//               ❤️ <span class="ms-1">${post.likes || 0}</span>
//             </button>
//             ${
//               showEditDelete
//                 ? `
//               <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
//               <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
//             `
//                 : ""
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
//   return col;
// }

// function createPost() {
//   if (!currentUser) return;

//   const heading = document.getElementById("post-heading").value.trim();
//   const desc = document.getElementById("post-description").value.trim();
//   const imgUrl = document.getElementById("post-image-url").value.trim();

//   if (!desc) {
//     alert("Description is required!");
//     return;
//   }

//   posts.unshift({
//     id: Date.now(),
//     heading,
//     description: desc,
//     imageUrl: imgUrl,
//     likes: 0,
//     likedBy: [],
//     authorEmail: currentUser.email,
//     timestamp: Date.now(),
//   });

//   localStorage.setItem("posts", JSON.stringify(posts));
//   document.getElementById("post-heading").value = "";
//   document.getElementById("post-description").value = "";
//   document.getElementById("post-image-url").value = "";

//   renderUserPosts();
//   renderHomePage();
// }

// function editPost(postId) {
//   const post = posts.find((p) => p.id === postId);
//   if (!post) return;

//   showDashboard();
//   document.getElementById("post-heading").value = post.heading || "";
//   document.getElementById("post-description").value = post.description;
//   document.getElementById("post-image-url").value = post.imageUrl || "";

//   const btn = document.querySelector("#dashboard-page .btn-success");
//   btn.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Update Post';
//   btn.onclick = () => updatePost(postId);
// }

// function updatePost(postId) {
//   const heading = document.getElementById("post-heading").value.trim();
//   const desc = document.getElementById("post-description").value.trim();
//   const imgUrl = document.getElementById("post-image-url").value.trim();

//   if (!desc) {
//     alert("Description is required!");
//     return;
//   }

//   const idx = posts.findIndex((p) => p.id === postId);
//   if (idx === -1) return;

//   posts[idx] = {
//     ...posts[idx],
//     heading,
//     description: desc,
//     imageUrl: imgUrl,
//     timestamp: Date.now(),
//   };
//   localStorage.setItem("posts", JSON.stringify(posts));

//   resetPostForm();
//   renderUserPosts();
//   renderHomePage();
// }

// function resetPostForm() {
//   document.getElementById("post-heading").value = "";
//   document.getElementById("post-description").value = "";
//   document.getElementById("post-image-url").value = "";
//   const btn = document.querySelector("#dashboard-page .btn-success");
//   btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Publish Post';
//   btn.onclick = createPost;
// }

// function toggleLike(postId) {
//   if (!currentUser) {
//     new bootstrap.Modal(document.getElementById("likePromptModal")).show();
//     return;
//   }

//   const postIndex = posts.findIndex((p) => p.id === postId);
//   if (postIndex === -1) return;

//   const post = posts[postIndex];
//   const hasLiked = post.likedBy?.includes(currentUser.email);

//   if (hasLiked) {
//     post.likedBy = post.likedBy.filter((email) => email !== currentUser.email);
//     post.likes = Math.max(0, (post.likes || 0) - 1);
//   } else {
//     post.likedBy = post.likedBy || [];
//     post.likedBy.push(currentUser.email);
//     post.likes = (post.likes || 0) + 1;
//   }

//   localStorage.setItem("posts", JSON.stringify(posts));
//   renderHomePage();
//   if (!document.getElementById("dashboard-page").classList.contains("d-none")) {
//     renderUserPosts();
//   }
// }

// function deletePost(postId) {
//   postIdToDelete = postId;
//   new bootstrap.Modal(document.getElementById("deleteConfirmModal")).show();
// }

// function confirmDeletePost() {
//   if (postIdToDelete === null) return;

//   posts = posts.filter((p) => p.id !== postIdToDelete);
//   localStorage.setItem("posts", JSON.stringify(posts));

//   bootstrap.Modal.getInstance(
//     document.getElementById("deleteConfirmModal")
//   ).hide();
//   renderHomePage();
//   if (!document.getElementById("dashboard-page").classList.contains("d-none")) {
//     renderUserPosts();
//   }

//   postIdToDelete = null;
// }


// document.getElementById("search-input")?.addEventListener("input", () => {
//   const term = document
//     .getElementById("search-input")
//     .value.toLowerCase()
//     .trim();
//   const feed = document.getElementById("posts-feed");
//   feed.innerHTML = "";

//   if (term === "") {
//     const sorted = [...posts].sort((a, b) => b.timestamp - a.timestamp);
//     sorted.forEach((post) => {
//       const authorName = getAuthorNameByEmail(post.authorEmail);
//       const card = createPostCard(post, authorName, false);
//       feed.appendChild(card);
//     });
//     return;
//   }

//   const filtered = posts.filter(
//     (post) =>
//       post.heading?.toLowerCase().includes(term) ||
//       post.description.toLowerCase().includes(term)
//   );

//   if (filtered.length === 0) {
//     feed.innerHTML = `
//       <div class="col-12">
//         <div class="alert alert-warning text-center rounded-3">
//           <i class="fas fa-search me-2"></i>No posts found for "${term}"
//         </div>
//       </div>
//     `;
//     return;
//   }

//   const sorted = filtered.sort((a, b) => b.timestamp - a.timestamp);
//   sorted.forEach((post) => {
//     const authorName = getAuthorNameByEmail(post.authorEmail);
//     const card = createPostCard(post, authorName, false);
//     feed.appendChild(card);
//   });
// });

// function logout() {
//   currentUser = null;
//   localStorage.removeItem("currentUser");
//   updateAuthUI();
//   showHomePage();
// }

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let postIdToDelete = null;

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateAuthUI();
  renderHomePage();
  
  // Theme toggle event
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
});

function updateAuthUI() {
  const authButtons = document.getElementById('auth-buttons');
  if (currentUser) {
    authButtons.innerHTML = `
      <span class="navbar-text me-3">
        <span class="welcome-badge">Welcome, ${currentUser.name}!</span>
      </span>
      <button class="btn-logout" onclick="logout()">Logout</button>
    `;
  } else {
    authButtons.innerHTML = `
      <button class="btn btn-outline-light me-2" onclick="openLoginModal()">Login</button>
      <button class="btn btn-light" onclick="openSignupModal()">Sign Up</button>
    `;
  }
}

function showHomePage() {
  document.getElementById('home-page').classList.remove('d-none');
  document.getElementById('dashboard-page').classList.add('d-none');
  renderHomePage();
}

function showDashboard() {
  if (!currentUser) {
    openLoginModal();
    return;
  }
  document.getElementById('home-page').classList.add('d-none');
  document.getElementById('dashboard-page').classList.remove('d-none');
  renderUserPosts();
}

function openLoginModal() {
  const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
  if (signupModal) signupModal.hide();
  new bootstrap.Modal(document.getElementById('loginModal')).show();
}

function openSignupModal() {
  const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  if (loginModal) loginModal.hide();
  new bootstrap.Modal(document.getElementById('signupModal')).show();
}

function switchToSignup() {
  bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
  openSignupModal();
}

function switchToLogin() {
  bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
  openLoginModal();
}

function openLoginFromPrompt() {
  bootstrap.Modal.getInstance(document.getElementById('likePromptModal')).hide();
  openLoginModal();
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) {
    alert('Please fill all fields');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateAuthUI();
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    showDashboard();
  } else {
    alert('Invalid email or password');
  }
}

function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  if (!name || !email || !password) {
    alert('All fields are required');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(u => u.email === email)) {
    alert('Email already exists!');
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Account created! Please log in.');
  switchToLogin();
}

function getAuthorNameByEmail(email) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);
  return user ? user.name : 'Deleted User';
}

function renderHomePage() {
  const feed = document.getElementById('posts-feed');
  feed.innerHTML = '';

  if (posts.length === 0) {
    feed.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info text-center rounded-3">
          No posts yet. Be the first to share!
        </div>
      </div>
    `;
    return;
  }

  const sorted = [...posts].sort((a, b) => b.timestamp - a.timestamp);
  sorted.forEach(post => {
    const authorName = getAuthorNameByEmail(post.authorEmail);
    const card = createPostCard(post, authorName, false);
    feed.appendChild(card);
  });
}

function renderUserPosts() {
  const feed = document.getElementById('user-posts-feed');
  feed.innerHTML = '';

  if (!currentUser) return;

  const userPosts = posts.filter(p => p.authorEmail === currentUser.email);
  if (userPosts.length === 0) {
    feed.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center rounded-3">
          You haven't posted anything yet.
        </div>
      </div>
    `;
    return;
  }

  const sorted = [...userPosts].sort((a, b) => b.timestamp - a.timestamp);
  sorted.forEach(post => {
    const card = createPostCard(post, currentUser.name, true);
    feed.appendChild(card);
  });
}

function createPostCard(post, authorName, showEditDelete) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4';

  const date = new Date(post.timestamp).toLocaleString();
  const imgHtml = post.imageUrl 
    ? `<img src="${post.imageUrl}" class="post-image" onerror="this.style.display='none'">` 
    : '';

  const isLikedByUser = currentUser && post.likedBy?.includes(currentUser.email);

  col.innerHTML = `
    <div class="card post-card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <h5 class="post-heading">${post.heading || 'Untitled'}</h5>
        <p class="post-description">${post.description}</p>
        ${imgHtml}
        <div class="mt-auto">
          <div class="post-meta">
            By: <span class="post-author">${authorName}</span> • ${date}
          </div>
          <div class="d-flex align-items-center mt-2">
            <button class="like-btn ${isLikedByUser ? 'liked' : ''}" onclick="toggleLike(${post.id})">
              ❤️ <span class="ms-1">${post.likes || 0}</span>
            </button>
            ${showEditDelete ? `
              <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
              <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
  return col;
}

function createPost() {
  if (!currentUser) return;

  const heading = document.getElementById('post-heading').value.trim();
  const desc = document.getElementById('post-description').value.trim();
  const imgUrl = document.getElementById('post-image-url').value.trim();

  if (!desc) {
    alert('Description is required!');
    return;
  }

  posts.unshift({
    id: Date.now(),
    heading,
    description: desc,
    imageUrl: imgUrl,
    likes: 0,
    likedBy: [],
    authorEmail: currentUser.email,
    timestamp: Date.now()
  });

  localStorage.setItem('posts', JSON.stringify(posts));
  document.getElementById('post-heading').value = '';
  document.getElementById('post-description').value = '';
  document.getElementById('post-image-url').value = '';

  renderUserPosts();
  renderHomePage();
}

function editPost(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  showDashboard();
  document.getElementById('post-heading').value = post.heading || '';
  document.getElementById('post-description').value = post.description;
  document.getElementById('post-image-url').value = post.imageUrl || '';

  const btn = document.querySelector('#dashboard-page .btn-success');
  btn.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Update Post';
  btn.onclick = () => updatePost(postId);
}

function updatePost(postId) {
  const heading = document.getElementById('post-heading').value.trim();
  const desc = document.getElementById('post-description').value.trim();
  const imgUrl = document.getElementById('post-image-url').value.trim();

  if (!desc) {
    alert('Description is required!');
    return;
  }

  const idx = posts.findIndex(p => p.id === postId);
  if (idx === -1) return;

  posts[idx] = { ...posts[idx], heading, description: desc, imageUrl: imgUrl, timestamp: Date.now() };
  localStorage.setItem('posts', JSON.stringify(posts));

  resetPostForm();
  renderUserPosts();
  renderHomePage();
}

function resetPostForm() {
  document.getElementById('post-heading').value = '';
  document.getElementById('post-description').value = '';
  document.getElementById('post-image-url').value = '';
  const btn = document.querySelector('#dashboard-page .btn-success');
  btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Publish Post';
  btn.onclick = createPost;
}
function toggleLike(postId) {
  if (!currentUser) {
    new bootstrap.Modal(document.getElementById('likePromptModal')).show();
    return;
  }

  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;

  const post = posts[postIndex];
  const hasLiked = post.likedBy?.includes(currentUser.email);

  if (hasLiked) {
    post.likedBy = post.likedBy.filter(email => email !== currentUser.email);
    post.likes = Math.max(0, (post.likes || 0) - 1);
  } else {
    post.likedBy = post.likedBy || [];
    post.likedBy.push(currentUser.email);
    post.likes = (post.likes || 0) + 1;
  }

  localStorage.setItem('posts', JSON.stringify(posts));
  renderHomePage();
  if (!document.getElementById('dashboard-page').classList.contains('d-none')) {
    renderUserPosts();
  }
}

function deletePost(postId) {
  postIdToDelete = postId;
  new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
}

function confirmDeletePost() {
  if (postIdToDelete === null) return;

  posts = posts.filter(p => p.id !== postIdToDelete);
  localStorage.setItem('posts', JSON.stringify(posts));

  bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
  renderHomePage();
  if (!document.getElementById('dashboard-page').classList.contains('d-none')) {
    renderUserPosts();
  }

  postIdToDelete = null;
}

document.getElementById('search-input')?.addEventListener('input', () => {
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  const feed = document.getElementById('posts-feed');
  feed.innerHTML = '';

  if (term === '') {
    const sorted = [...posts].sort((a, b) => b.timestamp - a.timestamp);
    sorted.forEach(post => {
      const authorName = getAuthorNameByEmail(post.authorEmail);
      const card = createPostCard(post, authorName, false);
      feed.appendChild(card);
    });
    return;
  }

  const filtered = posts.filter(post =>
    (post.heading?.toLowerCase().includes(term)) ||
    (post.description.toLowerCase().includes(term))
  );

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center rounded-3">
          <i class="fas fa-search me-2"></i>No posts found for "${term}"
        </div>
      </div>
    `;
    return;
  }
  const sorted = filtered.sort((a, b) => b.timestamp - a.timestamp);
  sorted.forEach(post => {
    const authorName = getAuthorNameByEmail(post.authorEmail);
    const card = createPostCard(post, authorName, false);
    feed.appendChild(card);
  });
});

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  showHomePage();
}