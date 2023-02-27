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

Deploying "FinalSolution" (tx: 0xa196ef653c9cadaf46f9d04439d878cf6f0b30795928ded2ba8009ff29a89a63)...: deployed at 0xCF20bfC854e47C117f0d9c54FC5110A0bD406849 with 2673463 gas
Final Solution Contract Deployed!

