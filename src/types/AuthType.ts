interface UserProfile{
    _id: string;
    username: string;
}

interface AuthContextType {
    user: UserProfile | null;
    login: (userData: UserProfile) => void;
    logout: () => void;
}   

export type { UserProfile, AuthContextType };