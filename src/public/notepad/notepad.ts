let text = '';
const textarea = document.getElementById('notepad') as HTMLTextAreaElement;

function handleChange(event: any) {
    text = textarea.value;
    console.log(text);
}
