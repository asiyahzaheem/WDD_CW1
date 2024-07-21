// Declare object array 
const pages = [
    { id: 'groupId1', url: '/asiyah/splash.html' },
    { id: 'groupId2', url: '/venuja/profile.html' },
    { id: 'groupId3', url: '/shan/home.html' },
    { id: 'groupId4', url: '/venuja/profile.html' },
    { id: 'groupId5', url: 'gallery.html' },
    { id: 'groupId6', url: '/asiyah/shop.html' },
    { id: 'groupId7', url: '/venuja/team.html' },
    { id: 'groupId8', url: '/shan/feedback.html' },

    { id: 'groupId10', url: '/asiyah/contentpage_1.html' },
    { id: 'groupId11', url: '/shan/contentpage_2.html' },
    { id: 'groupId12', url: '/venuja/contentpage_3.html' },
    { id: 'groupId13', url: 'contentpage_4.html' },

    { id: 'groupId14', url: '/asiyah/pageEditor_1.html' },
    { id: 'groupId15', url: '/shan/editorpage_2.html' },
    { id: 'groupId16', url: '/venuja/pageEditor.html' },
    { id: 'groupId17', url: 'editorpage_4.html' },

];

pages.forEach(page => {
    document.getElementById(page.id).addEventListener('click', function() {
        window.location.href = page.url; // Redirect to the clicked page
    });
});