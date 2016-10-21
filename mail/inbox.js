const MessageStore = require("./message_store.js");

class Inbox {
  constructor(node) {
    this.node = node;
    this.messages = new MessageStore();
  }

  render() {
    let ul = document.createElement("ul");
    ul.className = "messages";

    this.messages.getInboxMessages().forEach(
      (message) => {
        let li = this.renderMessage(message);
        ul.appendChild(li);
      }
    );

    return ul;
  }

  renderMessage(message) {
    let li = document.createElement("li");
    li.className = "message";
    let fromSpan = document.createElement("span");
    fromSpan.className = "from";
    fromSpan.innerText = message.from;

    let subjectSpan = document.createElement("span");
    subjectSpan.className = "subject";
    subjectSpan.innerText = message.subject;

    let bodySpan = document.createElement("span");
    bodySpan.className = "body";
    bodySpan.innerText = message.body;

    [fromSpan, subjectSpan, bodySpan].forEach(
      (span) => li.appendChild(span)
    );

    return li;

  }
}

module.exports = Inbox;
