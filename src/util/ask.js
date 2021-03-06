function ask(client, askTo, channel, question, onAnswerCb) {
  channel.send(`<@${askTo.id}> ${question}`);

  const notAnsweredHandler = () => {
    channel.send(`<@${askTo.id}> You didn't answer in 15s, now your chance is gone.`)
    client.off('message', finalAnswerHandler);
  }
  let notAnsweredTimeout;

  const finalAnswerHandler = msg => {
    if (msg.author.id === askTo.id && msg.channel.id === channel.id) {
      const answer = msg.content;
      clearTimeout(notAnsweredTimeout)
      client.off('message', finalAnswerHandler);
      onAnswerCb(answer);  
    }
  }

  notAnsweredTimeout = setTimeout(notAnsweredHandler, 15000);
  client.on('message', finalAnswerHandler);
}

module.exports = ask;