// Declare object array 
const pages = [
    { id: 'groupId1', url: 'splash.html' },
    { id: 'groupId2', url: 'profile.html' },
    { id: 'groupId3', url: 'home.html' },
    { id: 'groupId4', url: 'profile.html' },
    { id: 'groupId5', url: 'gallery.html' },
    { id: 'groupId6', url: 'shop.html' },
    { id: 'groupId7', url: 'team.html' },
    { id: 'groupId8', url: 'feedback.html' },

    { id: 'groupId10', url: 'contentPage_1.html' },
    { id: 'groupId11', url: 'contentpage_2.html' },
    { id: 'groupId12', url: 'contentpage_3.html' },
    { id: 'groupId13', url: 'contentpage_4.html' },

    { id: 'groupId14', url: 'pageEditor_1.html' },
    { id: 'groupId15', url: 'editorpage_2.html' },
    { id: 'groupId16', url: 'pageEditor.html' },
    { id: 'groupId17', url: 'editorpage_4.html' },

];

pages.forEach(page => {
    document.getElementById(page.id).addEventListener('click', function() {
        window.location.href = page.url; // Redirect to the clicked page
    });
});