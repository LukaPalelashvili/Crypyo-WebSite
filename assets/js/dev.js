$(document).ready(function(e) {
    var t = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    function a(t) {
        t < 1199 ? e("header nav, header .btns").appendTo(".mobile-nav") : e(".mobile-nav nav, .mobile-nav .btns").insertBefore(".mobile-nav-trigger")
    }

    function o(t) {
        t < 768 ? (e("footer .navigation h5 a").attr("aria-expanded", "false").addClass("collapsed"), e("footer .collapse").removeClass("show")) : (e("footer .navigation h5 a").attr("aria-expanded", "true").removeClass("collapsed"), e("footer .collapse").addClass("show"))
    }
    a(t), o(t), e(window).on("resize", function(e) {
        a(t = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)), o(t)
    }), e(".about-mission .inner .inline-links a").on("click", function() {
        var t = e(this).attr("href");
        return e("html, body").animate({
            scrollTop: e(t).offset().top + 5
        }, 500), !1
    }), e(".mobile-nav-trigger-close, .mobile-nav-trigger, .backdrop").on("click", function(t) {
        t.preventDefault(), e("body").toggleClass("nav-active")
    }), e(".community-nav-trigger-close, .community-nav-trigger, .backdrop-community-nav").on("click", function(t) {
        t.preventDefault(), e("body").toggleClass("community-nav-active")
    });
    try {
        n()
    } catch (e) {
        setTimeout(function() {
            n()
        }, 2500)
    }

    function n() {
        e(".editor-content pre code").each(function(e, t) {
            hljs.highlightBlock(t)
        })
    }
    if (e(".recently-updated").length) {
        var i = "";
        void 0 !== Cookies.get("recently-updated") ? e(".recently-updated").append(Cookies.get("recently-updated")) : fetch("https://api.github.com/users/status-im/repos?sort=updated&per_page=3").then(function(t) {
            200 === t.status ? t.json().then(function(t) {
                t.forEach(function(e) {
                    i += '<li><a href="' + e.html_url + '">' + e.full_name + "</a></li>"
                }), Cookies.set("recently-updated", i, {
                    expires: 1
                }), e(".recently-updated").append(i)
            }) : console.log("Looks like there was a problem. Status Code: " + t.status)
        }).catch(function(e) {
            console.log("Fetch Error :-S", e)
        })
    }
    if (e("#advocacy-programs").length) {
        e.ajax({
            type: "get",
            url: "https://statusphere.status.im/api/v1/boards/public/?is_featured=true&org=375",
            success: function(t) {
                e.each(t, function(t, a) {
                    var o = a.description.substr(0, 200) + "...";
                    e("#advocacy-programs").prepend('<div class="inner">                 <a href="https://statusphere.status.im/b/' + a.uuid + '/view" class="card-inner">                   ' + a.title + '                </a>                 <p class="details">' + o + "</p>               </div>")
                })
            }
        })
    }
    if (e(".sidebar").stick_in_parent({
            offset_top: 30
        }), e('input[name="userSearch"]').length && (window.addEventListener("click", function(t) {
            document.getElementById("search-form").contains(t.target) ? e("#search-form").removeClass("inactive") : e("#search-form").addClass("inactive")
        }), e('input[name="userSearch"]').on("keyup", function() {
            var t = e(this).val();
            e("#search-results").empty(), e.ajax({
                url: "https://search.status.im/status.im/_search?size=10&_source=title,url&&q=" + t
            }).done(function(t) {
                e.each(t.hits.hits, function(t, a) {
                    e('<a href="' + a._source.url + '">' + a._source.title + "</a>").appendTo("#search-results")
                })
            })
        })), e(".features-intro ul li a").on("click", function(t) {
            t.preventDefault();
            var a = e(this).attr("href");
            e("html, body").animate({
                scrollTop: e(a).offset().top
            }, 300)
        }), e(".home-intro .announcement").length) {
        e.ajax({
            url: "https://our.status.im/ghost/api/v2/content/posts/?key=10e7f8c1f793d2945ea1177076&limit=1&fields=title,url"
        }).done(function(t) {
            e(".home-intro .announcement b").text(t.posts[0].title), e(".home-intro .announcement").attr("href", t.posts[0].url).removeClass("inactive")
        }).fail(function() {
            e.ajax({
                url: "https://our.status.im/ghost/api/v0.1/posts/?include=tags&formats=plaintext&client_id=ghost-frontend&client_secret=2b055fcd57ba&limit=1"
            }).done(function(t) {
                e(".home-intro .announcement b").text(t.posts[0].title), e(".home-intro .announcement").attr("href", "https://our.status.im" + t.posts[0].url).removeClass("inactive")
            })
        })
    }
    if (e(".sidebar-mobile-trigger, .mobile-sidebar-trigger-close").on("click", function(t) {
            t.preventDefault(), e("body").toggleClass("sidebar-active")
        }), e(".quick-nav").length) {
        var s = e(".quick-nav").offset().top;
        e(window).on("resize", function() {
            s = e(".quick-nav").offset().top
        }), e(window).on("scroll", function() {
            e(window).scrollTop() > s ? e(".quick-nav, .quick-nav-sub").addClass("fixed") : e(".quick-nav, .quick-nav-sub").removeClass("fixed")
        }), e(".quick-nav-sub ul li a").on("click", function(t) {
            t.preventDefault();
            var a = e(this).attr("href");
            e("html, body").animate({
                scrollTop: e(a).offset().top - 100
            }, 300)
        })
    }
    if (e(".open-issues").length) {
        var r = "";
        void 0 !== Cookies.get("open-issues-react") ? e(".open-issues-react").append(localStorage.getItem("open-issues-react")) : fetch("https://api.github.com/repos/status-im/status-react/issues?sort=created&per_page=30").then(function(t) {
            200 === t.status ? t.json().then(function(t) {
                var a = 0;
                t.forEach(function(e) {
                    if (void 0 === e.pull_request && a < 4) {
                        var t = new Date,
                            o = '<div class="tags">';
                        e.labels.forEach(function(e) {
                            o += '<div class="tag">' + e.name + "</div>"
                        }), o += "</div>", r += '<li>                         <div class="number">#' + e.number + '</div>                         <div class="details">                           <b><a href="' + e.html_url + '" target="_blank">' + e.title + "</a></b>                             " + o + '                           <div class="opened">                             Opened: <time>' + l(t, new Date(e.created_at)) + '</time>                           </div>                           <div class="activity">                             Last activity: <time>' + l(t, new Date(e.updated_at)) + "</time>                           </div>                         </div>                       </li>", a++
                    }
                }), localStorage.removeItem("open-issues-react"), localStorage.setItem("open-issues-react", r), Cookies.set("open-issues-react", !0, {
                    expires: 1
                }), e(".open-issues-react").append(r)
            }) : console.log("Looks like there was a problem. Status Code: " + t.status)
        }).catch(function(e) {
            console.log("Fetch Error :-S", e)
        });
        var c = "";
        void 0 !== Cookies.get("open-issues-go") ? e(".open-issues-go").append(localStorage.getItem("open-issues-go")) : fetch("https://api.github.com/repos/status-im/status-go/issues?sort=created&per_page=30").then(function(t) {
            200 === t.status ? t.json().then(function(t) {
                var a = 0;
                t.forEach(function(e) {
                    if (void 0 === e.pull_request && a < 4) {
                        var t = new Date,
                            o = '<div class="tags">';
                        e.labels.forEach(function(e) {
                            o += '<div class="tag">' + e.name + "</div>"
                        }), o += "</div>", c += '<li>                         <div class="number">#' + e.number + '</div>                         <div class="details">                           <b><a href="' + e.html_url + '" target="_blank">' + e.title + "</a></b>                             " + o + '                           <div class="opened">                             Opened: <time>' + l(t, new Date(e.created_at)) + '</time>                           </div>                           <div class="activity">                             Last activity: <time>' + l(t, new Date(e.updated_at)) + "</time>                           </div>                         </div>                       </li>", a++
                    }
                }), localStorage.removeItem("open-issues-go"), localStorage.setItem("open-issues-go", c), Cookies.set("open-issues-go", !0, {
                    expires: 1
                }), e(".open-issues-go").append(c)
            }) : console.log("Looks like there was a problem. Status Code: " + t.status)
        }).catch(function(e) {
            console.log("Fetch Error :-S", e)
        })
    }

    function l(e, t) {
        var a = e - t;
        return a < 6e4 ? Math.round(a / 1e3) + " seconds ago" : a < 36e5 ? Math.round(a / 6e4) + " minutes ago" : a < 864e5 ? Math.round(a / 36e5) + " hours ago" : a < 2592e6 ? Math.round(a / 864e5) + " days ago" : a < 31536e6 ? Math.round(a / 2592e6) + " months ago" : Math.round(a / 31536e6) + " years ago"
    }
    e(".contributor .contributor-trigger").on("click", function(e) {
        e.preventDefault()
    }), e(".right-sub-navigation").length && (e(".editor-content h1, .editor-content h2, .editor-content h3").each(function(t, a) {
        var o = e(this).attr("id"),
            n = e(this).text();
        e(".right-sub-navigation ul").append('<li class="li-' + e(this)[0].nodeName.toLowerCase() + '"><a href="#' + o + '">' + n + "</a></li>")
    }), e(".right-sub-navigation").stick_in_parent({
        offset_top: 30
    }), e(".right-sub-navigation a").on("click", function() {
        var t = e(this).attr("href");
        return e("html, body").animate({
            scrollTop: e(t).offset().top - 50
        }, 500), !1
    }))
});