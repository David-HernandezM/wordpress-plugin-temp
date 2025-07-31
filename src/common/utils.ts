export const copyToClipboard = ({ value }: { value: string }) => {
    // search for better notification
    const onSuccess = () => alert('Copied');
    const onError = () => alert('Copy error');

    function unsecuredCopyToClipboard(text: string) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            onSuccess();
        } catch (err) {
        console.error('Unable to copy to clipboard', err);
        onError();
        }
        document.body.removeChild(textArea);
    }

    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard
        .writeText(value)
        .then(() => onSuccess())
        .catch(() => onError());
    } else {
        unsecuredCopyToClipboard(value);
    }
};