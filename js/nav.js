"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $("#main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navStoryForm() {
  console.debug("navStorySubmit");
  hidePageComponents();
  $storyForm.show();
}

$navStoryForm.on("click", navStoryForm);

function faveStoryform() {
  console.debug("faveStoryform")
  if (currentUser.favorites.length < 1) { return }
  putFavoritesOnPage()
  hidePageComponents()
  $faveListForm.show()
}

$faveStorylist.on("click", faveStoryform);