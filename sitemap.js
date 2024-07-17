const pages = [
    { id: 'groupId1', url: 'splash.html' },
    { id: 'groupId2', url: 'login.html' },
    { id: 'groupId3', url: 'home.html' },
    { id: 'groupId4', url: 'profile.html' },
    { id: 'groupId5', url: 'gallery.html' },
    { id: 'groupId6', url: 'shop.html' },
    { id: 'groupId7', url: '_checkout.html' },
    { id: 'groupId8', url: 'team.html' },
    { id: 'groupId9', url: 'feedback.html' }
];

pages.forEach(page => {
    document.getElementById(page.id).addEventListener('click', function() {
        window.location.href = page.url;
    });
});