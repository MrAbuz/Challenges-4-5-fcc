Challenge 5: Final NFT

- Contrato que tem uma função getOwner() que dá return à minha address metamask hard coded
- Vulnerable contract address: 0x241F77325C073a3815985691f76B58dff17F685B

- Eu tenho que chamar mintNft() e:
        - Passar como address o meu contracto deployed que tem a função getOwner()
        - Como selector o selector de uma função que eu crie nesse contrato com a função getOwner()
        - Essa função tem que chamar callContractAgain() (com a address que o constructor foi inicializado) para fazer uma especie de reentrancy
        - Mas quando chamar passa outra vez a mesma address, mas já passa outro selector de uma função que apenas vai dar return true


Answer for selector one is: 0x901717d1
Answer for selector two is: 0x5fdf05d7

Deploying "solution" (tx: 0xfcf00e456d4869790d3720de742ce45674fb2c01666f219dcf9214c83742bb7a)...: deployed at 0xd3a0A52872DFfc8482Ed8a56382e8114Dd08FF1e with 1977311 gas