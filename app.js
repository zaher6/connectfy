const API_URL = 'http://localhost:5000/api';

// جميع الوظائف هنا مباشرة
async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);
  return await response.json();
}

async function createPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return await response.json();
}


document.addEventListener('DOMContentLoaded', async () => {
  // تحميل المشاركات عند فتح الصفحة
  const posts = await getPosts();
  renderPosts(posts);

  // إضافة مشاركة جديدة
  document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPost = {
      title: document.getElementById('postTitle').value,
      content: document.getElementById('postContent').value
    };

    const createdPost = await createPost(newPost);
    posts.unshift(createdPost);
    renderPosts(posts);
    
    e.target.reset();
  });
});

function renderPosts(posts) {
  const postsContainer = document.getElementById('postsList');
  postsContainer.innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>${new Date(post.createdAt).toLocaleDateString()}</small>
    </div>
  `).join('');
}