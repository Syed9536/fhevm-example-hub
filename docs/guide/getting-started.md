# 🚀 Getting Started

Welcome to the **FHEVM Example Hub**. This guide will help you set up your local environment to run and test the FHE examples using **Mock Mode** (No Docker required).

## 🧠 Core Concept: How FHE Works

Before you start coding, here is a quick visual of how Fully Homomorphic Encryption keeps data safe:

```mermaid
graph LR
    A[User Input] -->|Encrypt| B(Encrypted Hash)
    B -->|Send| C{Smart Contract}
    C -->|Compute Blindly| D(Encrypted Result)
    D -->|Return| E[User]
    E -->|Decrypt| F[Real Output]

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style D fill:#bbf,stroke:#333,stroke-width:1px