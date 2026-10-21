const draft = document.getElementById('draft');
const statusLine = document.getElementById('status');
const saveButton = document.getElementById('save');

try {
  draft.value = localStorage.getItem('draft') ?? '';
} catch (error) {
  statusLine.textContent = `读取失败：${error.message}`;
}

saveButton.addEventListener('click', () => {
  try {
    localStorage.setItem('draft', draft.value);
    statusLine.textContent = '已保存到这个 App 的本机存储';
  } catch (error) {
    statusLine.textContent = `保存失败：${error.message}`;
  }
});

window.gugu.getContext().then((context) => {
  document.documentElement.lang = context.locale || 'zh-CN';
}).catch((error) => {
  statusLine.textContent = `读取 App 环境失败：${error.message}`;
});
