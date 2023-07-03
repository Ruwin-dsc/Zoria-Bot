module.exports = {
    name: "messageDelete",
    once: false,
    async execute(client, message) {

        
        if(client.snipes.get(message.channel.id)) await client.snipes.delete(message.channel.id) &&
        await client.snipes.set(message.channel.id, message)
        else await client.snipes.set(message.channel.id, message)
        
      
        

        
    }
}