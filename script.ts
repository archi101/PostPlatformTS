interface Post {
  id: number;
  title: string;
  body: string;
}

let postCount = 1;
let postToDelete: HTMLElement | null = null;

let postDeleted: number[] = Array.from(new Set(JSON.parse(localStorage.getItem('deletedPosts') || '[]')));
let storedPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');


function renderPost(post: Post, isDeleted: boolean = false) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  if (isDeleted) postDiv.classList.add('deleted-post');
  postDiv.setAttribute('id', `${post.id}`);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');

  const titleTextDiv = document.createElement('div');
  titleTextDiv.classList.add('titleText');
  titleTextDiv.textContent = `Title: ${post.title}`;
  titleDiv.appendChild(titleTextDiv);

  if (!isDeleted) {
    const crossIcon = document.createElement('img');
    crossIcon.classList.add('crossIcon');
    crossIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRj9c9AlJpKO8IGQL-8kZQOo4Gtfrut6ztw&s';
    crossIcon.alt = 'cross icon';
    crossIcon.width = 24;
    crossIcon.height = 24;
    titleDiv.appendChild(crossIcon);
  }

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('body');
  const bodyLabel = document.createElement('strong');
  bodyLabel.textContent = 'Body: ';
  
  const bodyText = document.createElement('span');
  bodyText.textContent = post.body;
  
  bodyDiv.appendChild(bodyLabel);
  bodyDiv.appendChild(bodyText);

  postDiv.appendChild(titleDiv);
  postDiv.appendChild(bodyDiv);

  const container = isDeleted ? 
    document.getElementById('deletedPostContainer') : 
    document.getElementById('postContainer');
  container?.appendChild(postDiv);
}


function refreshPosts() {
  const postContainer = document.getElementById('postContainer');
  const deletedPostContainer = document.getElementById('deletedPostContainer');
  
  if (postContainer && deletedPostContainer) {
    postContainer.innerHTML = '';
    deletedPostContainer.innerHTML = '';
    
  
    storedPosts.forEach(post => {
      if (!postDeleted.includes(post.id)) {
        renderPost(post);
      }
    });

    storedPosts.forEach(post => {
      if (postDeleted.includes(post.id)) {
        renderPost(post, true);
      }
    });
  }
}


function initializePostCount() {
  if (storedPosts.length > 0) {
    const maxId = Math.max(...storedPosts.map(post => post.id));
    postCount = maxId + 1;
  }
}


function addToDeletedPosts(postId: number) {
  if (!postDeleted.includes(postId)) {
    postDeleted.push(postId);
  
    postDeleted = Array.from(new Set(postDeleted));
    localStorage.setItem('deletedPosts', JSON.stringify(postDeleted));
  }
}


window.addEventListener('load', () => {
  initializePostCount();

  postDeleted = Array.from(new Set(postDeleted));
  localStorage.setItem('deletedPosts', JSON.stringify(postDeleted));
  refreshPosts();
});

document.getElementById('togglePostsButton')?.addEventListener('click', function() {
  const button = this as HTMLButtonElement;
  const postContainer = document.getElementById('postContainer');
  const deletedPostContainer = document.getElementById('deletedPostContainer');
  
  const isShowingActive = postContainer?.classList.contains('visible');
  
  if (isShowingActive) {
    postContainer?.classList.remove('visible');
    postContainer?.classList.add('hidden');
    deletedPostContainer?.classList.remove('hidden');
    deletedPostContainer?.classList.add('visible');
    button.textContent = 'Show Active Posts';
    button.classList.add('showing-deleted');
  } else {
    postContainer?.classList.remove('hidden');
    postContainer?.classList.add('visible');
    deletedPostContainer?.classList.remove('visible');
    deletedPostContainer?.classList.add('hidden');
    button.textContent = 'Show Deleted Posts';
    button.classList.remove('showing-deleted');
  }
});

document.getElementById('addPostButton')?.addEventListener('click', async function() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postCount}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    
    const post = await response.json();
    storedPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    renderPost(post);
    postCount++;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
});

document.getElementById('postContainer')?.addEventListener('click', function(event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains('crossIcon')) {
    postToDelete = target.closest('.post');
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'block';
  }
});

document.getElementById('confirmDelete')?.addEventListener('click', function() {
  if (postToDelete) {
    const postId = postToDelete.getAttribute('id');
    
    if (postId) {
      const numericId = Number(postId);
      addToDeletedPosts(numericId);
      refreshPosts();
    }
    
    postToDelete = null;
  }
  const modal = document.getElementById('myModal');
  if (modal) modal.style.display = 'none';
});

document.getElementById('rejectDelete')?.addEventListener('click', function() {
  const modal = document.getElementById('myModal');
  if (modal) modal.style.display = 'none';
  postToDelete = null;
});

document.getElementById('refreshButton')?.addEventListener('click', refreshPosts);


window.addEventListener('click', function(event) {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
    modal!.style.display = 'none';
    postToDelete = null;
  }
});