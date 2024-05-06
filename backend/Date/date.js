const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',  hour: '2-digit',minute: '2-digit',second: '2-digit' };

export default new Date().toLocaleDateString('en-MY',options);