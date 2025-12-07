import { createInstance } from 'fhevmjs';

let fhevmInstance; 

// Tumhari Metamask provider ko use karke FHEVM instance banayega
export const initFhevm = async (signer, chainId = 8009) => {
    if (fhevmInstance) return fhevmInstance;

    try {
        fhevmInstance = await createInstance({ 
            provider: signer.provider, 
            chainId: chainId 
        });
        
        // Final check aur public key generate
        const publicKey = fhevmInstance.getPublicKey(signer.address);
        console.log("FHEVM Instance Ready. Public Key:", publicKey);
        return fhevmInstance;
    } catch (error) {
        console.error("FHEVM initialization failed:", error);
        throw new Error("Could not initialize FHEVM instance.");
    }
};

// Tumhari Public Key nikalne ka function (Bina iske encryption nahi hogi)
export const getPublicKey = (address) => {
    if (!fhevmInstance) return null;
    return fhevmInstance.getPublicKey(address);
};