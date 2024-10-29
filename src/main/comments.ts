export const initComments = (): void => {
  const form: HTMLElement | null = document.querySelector('.comment-form');
  const nameField: HTMLInputElement | null = document.querySelector('#name');
  const commentField: HTMLInputElement | null =
    document.querySelector('#comment');
  const list: HTMLElement | null = document.querySelector('.comment-container');

  if (
    form !== null &&
    nameField !== null &&
    commentField !== null &&
    list !== null
  ) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      const nameValue = nameField.value;
      const commentValue = commentField.value;

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';
    };
  }
};
