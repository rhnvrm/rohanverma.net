+++
title = "Contact"
template = "contact.html"
+++

<div class="contact-page">

<div class="contact-primary">
    <p class="contact-intro">Want to chat about code, collaborate on a project, or just say hello?</p>
    <a href="#" class="contact-email" id="email-link" data-user="olleh" data-domain="ten.amrevnahor">
        <span class="email-placeholder">Enable JavaScript to see email</span>
    </a>
    <p class="contact-note">I usually respond within a day or two.</p>
</div>

<script>
(function() {
    var link = document.getElementById('email-link');
    if (link) {
        var user = link.dataset.user.split('').reverse().join('');
        var domain = link.dataset.domain.split('').reverse().join('');
        var email = user + '@' + domain;
        link.href = 'mailto:' + email;
        link.textContent = email;
    }
})();
</script>

<div class="contact-links">
    <h2>Elsewhere</h2>
    <ul class="link-list">
        <li><a href="https://github.com/rhnvrm">GitHub</a> <span class="link-desc">code & projects</span></li>
        <li><a href="https://twitter.com/rhnvrm">Twitter</a> <span class="link-desc">thoughts & updates</span></li>
        <li><a href="https://fosstodon.org/@rhnvrm">Mastodon</a> <span class="link-desc">fediverse</span></li>
        <li><a href="https://www.linkedin.com/in/rhnvrm/">LinkedIn</a> <span class="link-desc">professional</span></li>
        <li><a href="https://www.youtube.com/TheRohanVerma">YouTube</a> <span class="link-desc">videos</span></li>
        <li><a href="https://zerodha.tech/authors/rhnvrm/">Zerodha Tech</a> <span class="link-desc">work blog</span></li>
        <li><a href="https://keybase.io/rhnvrm">Keybase</a> <span class="link-desc">secure contact</span></li>
    </ul>
</div>

</div>
