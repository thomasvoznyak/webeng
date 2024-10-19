const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;
    if(showHideText === 'Show comments') {
        showHideBtn.textContent = 'Hide comments';
        commentWrapper.style.display = 'block';
    } else {
        showHideBtn.textContent = 'Show comments';
        commentWrapper.style.display = 'none';
    }
};