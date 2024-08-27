// sockets/websocketHandler.js
const noteRooms = {}; // Store the active note rooms and their participants

module.exports = (io) => {
    io.on('connection', (socket) => {
        const { noteId, userId } = socket.handshake.query; // Extract noteId and userId from query

        // Check if user has access to the note (You need to implement your logic here)
        const hasAccess = checkUserAccess(noteId, userId);
        if (!hasAccess) {
            socket.disconnect(); // Disconnect if the user shouldn't have access
            return;
        }

        // Join the user to the specific note room
        socket.join(noteId);
        if (!noteRooms[noteId]) {
            noteRooms[noteId] = [];
        }
        noteRooms[noteId].push(userId);

        console.log(`User ${userId} joined note ${noteId}`);

        // Handle note edits
        socket.on('note-edit', ({ noteId, content, userId }) => {
            // Optionally save the content to a database here
            console.log(`User ${userId} edited note ${noteId}`);

            // Broadcast the updated content to all users in the same note room
            socket.to(noteId).emit('note-update', content);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            // Remove user from the note room
            if (noteRooms[noteId]) {
                noteRooms[noteId] = noteRooms[noteId].filter((id) => id !== userId);
                if (noteRooms[noteId].length === 0) {
                    delete noteRooms[noteId];
                }
            }
            console.log(`User ${userId} left note ${noteId}`);
        });
    });
};

// Helper function to check user access (Replace with actual access logic)
function checkUserAccess(noteId, userId) {
    // Example logic: Check if the user is part of a pair assigned to this note
    // This should be replaced with actual validation based on your application
    const pairs = {
        'note1': ['user123', 'user456'], // Example: user123 and user456 can access note1
        'note2': ['user789', 'user321'],
    };
    return pairs[noteId] && pairs[noteId].includes(userId);
}
