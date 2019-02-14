'use strict';

function getRepos(userName) {
    console.log('getReposRan')
    const url = 'https://api.github.com/users/'+ userName + '/repos?type=all&sort=full_name'
    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response;
            })
        .then(response => response.json())
        .then(responseJson => displayReults(responseJson))
        .catch(err => failureCallback(err))     
};

function displayReults(responseJson) {
    console.log(responseJson);
    $('.repoResults').empty();
    $('.repoResults').append(`
    <h3></h3><ul id="listRepos"></ul>`);
    for(let i = 0; i < responseJson.length; i++){
        console.log(`Created li link for ${responseJson[i].name}`)
        $('#listRepos').append(
            `<li><a href="${responseJson[i].clone_url}" target='_blank'>${responseJson[i].name}</a></li>`
        )};
    $('.repoResults > h3').append(
        `All repos for GitHub user: ${responseJson[0].owner.login}`)
    $('.repoResults').removeClass('hidden')
};

function failureCallback(errMessage) {
    console.log(errMessage)
    $('.repoResults').append(
        `We are sorry but there are no GitHub users with that handel.<br> ${errMessage}`)
    $('.repoResults').removeClass('hidden')
};

function initalizeSearch() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('Search submitted');
        let str = document.getElementById("gitHandelInput").value;
        let userHandel = str.toLowerCase();
        getRepos(userHandel);
        document.getElementById("userForm").reset(); 
    });
};

$(function() {
    console.log('Search is loaded');
    initalizeSearch();
});
