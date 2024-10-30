export const initShowHideButton = (): void => {
  const showHideBtn: HTMLElement | null = document.querySelector('.show-hide');
  const commentWrapper: HTMLElement | null =
    document.querySelector('.comment-wrapper');

  if (commentWrapper !== null) {
    commentWrapper.style.display = 'none';

    if (showHideBtn !== null) {
      showHideBtn.onclick = () => {
        const showHideText = showHideBtn.textContent;
        if (showHideText === 'Show comments') {
          showHideBtn.textContent = 'Hide comments';
          commentWrapper.style.display = 'block';
        } else {
          showHideBtn.textContent = 'Show comments';
          commentWrapper.style.display = 'none';
        }
      };
    }
  }
};
