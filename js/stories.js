"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  const hostName = story.getHostName(story);
  return $(`
      <li id="${story.storyId}">
        <input type=checkbox onclick="storeOrDelete(this.parentElement)" id="fave"></input>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <small class='story-delete' onclick='User.deleteStory(this.parentElement)'>Delete</small>
      </li>
    `);
}


function storeOrDelete(check) {
  let checked = check.querySelector("#fave").checked
  const storyId = check.id
  const url = check.querySelector('a').href
  const title = check.querySelector('a').innerText
  let author = check.querySelector('.story-author').innerText.slice(3)
  const story = { storyId, url, author, title }
  checked ? User.storeAsFave(story) : User.deleteasFave(story)
}

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");
  $faveListForm.empty()
  for (let fave of currentUser.favorites) {
    const $fave = generateStoryMarkup(fave)
    $fave.find("#fave").remove()
    $fave.appendTo($faveListForm);
  }
  $faveListForm.show()
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    if (currentUser != undefined) {
      for (let fave of currentUser.favorites) {
        if (fave.storyId == story.storyId) {
          $story.find("#fave").prop("checked", true)
        }
      }
    }

    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** Takes data from story form, pushes to website, and updates story page list */

async function storySubmitandShow() {
  console.debug("storySubmitandShow");
  /* Gets data from form */
  const author = $("#author").val()
  const title = $("#title").val()
  const url = $("#url").val()
  const substory = { title, url, author }
  const data = { token: currentUser.loginToken, story: substory }
  const newstory = await StoryList.addStory(data)

  const $story = generateStoryMarkup(newstory)
  $allStoriesList.prepend($story)
}
$storyForm.on("submit", storySubmitandShow);
