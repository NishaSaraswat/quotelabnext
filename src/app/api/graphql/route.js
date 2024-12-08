import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/lib/graphql/schema';
import resolvers from '@/lib/graphql/resolvers';
import mongoose from 'mongoose';
import { MONGO_URI } from '@/lib/config';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

// Connect to MongoDB
const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return;
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req) => {
        // Get the token from the Authorization header
        const token = req.headers.get('authorization') || '';
        
        if (token) {
            try {
                const { userId } = jwt.verify(token, JWT_SECRET);
                return { userId };
            } catch (err) {
                console.error('Token verification failed:', err);
            }
        }
        return {};
    },
});

export { handler as GET, handler as POST };
