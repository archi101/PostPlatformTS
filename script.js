var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e, _f;
var postCount = 1;
var postToDelete = null;
// Use Set for unique deleted post IDs
var postDeleted = Array.from(new Set(JSON.parse(localStorage.getItem('deletedPosts') || '[]')));
var storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
// Function to render a post
function renderPost(post, isDeleted) {
    if (isDeleted === void 0) { isDeleted = false; }
    var postDiv = document.createElement('div');
    postDiv.classList.add('post');
    if (isDeleted)
        postDiv.classList.add('deleted-post');
    postDiv.setAttribute('id', "".concat(post.id));
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    var titleTextDiv = document.createElement('div');
    titleTextDiv.classList.add('titleText');
    titleTextDiv.textContent = "Title: ".concat(post.title);
    titleDiv.appendChild(titleTextDiv);
    if (!isDeleted) {
        var crossIcon = document.createElement('img');
        crossIcon.classList.add('crossIcon');
        crossIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRj9c9AlJpKO8IGQL-8kZQOo4Gtfrut6ztw&s';
        crossIcon.alt = 'cross icon';
        crossIcon.width = 24;
        crossIcon.height = 24;
        titleDiv.appendChild(crossIcon);
    }
    var bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');
    var bodyLabel = document.createElement('strong');
    bodyLabel.textContent = 'Body: ';
    var bodyText = document.createElement('span');
    bodyText.textContent = post.body;
    bodyDiv.appendChild(bodyLabel);
    bodyDiv.appendChild(bodyText);
    postDiv.appendChild(titleDiv);
    postDiv.appendChild(bodyDiv);
    var container = isDeleted ?
        document.getElementById('deletedPostContainer') :
        document.getElementById('postContainer');
    container === null || container === void 0 ? void 0 : container.appendChild(postDiv);
}
// Function to refresh all posts
function refreshPosts() {
    var postContainer = document.getElementById('postContainer');
    var deletedPostContainer = document.getElementById('deletedPostContainer');
    if (postContainer && deletedPostContainer) {
        postContainer.innerHTML = '';
        deletedPostContainer.innerHTML = '';
        // Render active posts
        storedPosts.forEach(function (post) {
            if (!postDeleted.includes(post.id)) {
                renderPost(post);
            }
        });
        // Render deleted posts
        storedPosts.forEach(function (post) {
            if (postDeleted.includes(post.id)) {
                renderPost(post, true);
            }
        });
    }
}
// Initialize counters
function initializePostCount() {
    if (storedPosts.length > 0) {
        var maxId = Math.max.apply(Math, storedPosts.map(function (post) { return post.id; }));
        postCount = maxId + 1;
    }
}
// Function to ensure unique deleted posts
function addToDeletedPosts(postId) {
    if (!postDeleted.includes(postId)) {
        postDeleted.push(postId);
        // Convert to Set and back to array to ensure uniqueness
        postDeleted = Array.from(new Set(postDeleted));
        localStorage.setItem('deletedPosts', JSON.stringify(postDeleted));
    }
}
// Event Listeners
window.addEventListener('load', function () {
    initializePostCount();
    // Ensure unique deleted posts on load
    postDeleted = Array.from(new Set(postDeleted));
    localStorage.setItem('deletedPosts', JSON.stringify(postDeleted));
    refreshPosts();
});
(_a = document.getElementById('togglePostsButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var button = this;
    var postContainer = document.getElementById('postContainer');
    var deletedPostContainer = document.getElementById('deletedPostContainer');
    var isShowingActive = postContainer === null || postContainer === void 0 ? void 0 : postContainer.classList.contains('visible');
    if (isShowingActive) {
        postContainer === null || postContainer === void 0 ? void 0 : postContainer.classList.remove('visible');
        postContainer === null || postContainer === void 0 ? void 0 : postContainer.classList.add('hidden');
        deletedPostContainer === null || deletedPostContainer === void 0 ? void 0 : deletedPostContainer.classList.remove('hidden');
        deletedPostContainer === null || deletedPostContainer === void 0 ? void 0 : deletedPostContainer.classList.add('visible');
        button.textContent = 'Show Active Posts';
        button.classList.add('showing-deleted');
    }
    else {
        postContainer === null || postContainer === void 0 ? void 0 : postContainer.classList.remove('hidden');
        postContainer === null || postContainer === void 0 ? void 0 : postContainer.classList.add('visible');
        deletedPostContainer === null || deletedPostContainer === void 0 ? void 0 : deletedPostContainer.classList.remove('visible');
        deletedPostContainer === null || deletedPostContainer === void 0 ? void 0 : deletedPostContainer.classList.add('hidden');
        button.textContent = 'Show Deleted Posts';
        button.classList.remove('showing-deleted');
    }
});
(_b = document.getElementById('addPostButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function () {
        var response, post, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts/".concat(postCount))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to fetch post');
                    return [4 /*yield*/, response.json()];
                case 2:
                    post = _a.sent();
                    storedPosts.push(post);
                    localStorage.setItem('posts', JSON.stringify(storedPosts));
                    renderPost(post);
                    postCount++;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching post:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
(_c = document.getElementById('postContainer')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('crossIcon')) {
        postToDelete = target.closest('.post');
        var modal = document.getElementById('myModal');
        if (modal)
            modal.style.display = 'block';
    }
});
(_d = document.getElementById('confirmDelete')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    if (postToDelete) {
        var postId = postToDelete.getAttribute('id');
        if (postId) {
            var numericId = Number(postId);
            addToDeletedPosts(numericId);
            refreshPosts();
        }
        postToDelete = null;
    }
    var modal = document.getElementById('myModal');
    if (modal)
        modal.style.display = 'none';
});
(_e = document.getElementById('rejectDelete')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    var modal = document.getElementById('myModal');
    if (modal)
        modal.style.display = 'none';
    postToDelete = null;
});
(_f = document.getElementById('refreshButton')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', refreshPosts);
// Close modal when clicking outside
window.addEventListener('click', function (event) {
    var modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        postToDelete = null;
    }
});
