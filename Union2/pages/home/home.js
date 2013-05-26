﻿(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            // Override link clicks and fire linkClickEventHandler
            WinJS.Utilities.query("a").listen("click", this.linkClickEventHandler, false);
        },

        linkClickEventHandler: function (eventInfo) {
            eventInfo.preventDefault();
            var link = eventInfo.currentTarget;
            WinJS.Navigation.navigate(link.href);
        }
    });
})();
