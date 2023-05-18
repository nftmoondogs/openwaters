import { ethers, ContractInterface } from "ethers";

export const readContractABI = async (contractUrl: string): Promise<ContractInterface> =>
  new Promise((resolve, reject) => {
    let contractData;

    fetch(contractUrl)
      .then((response) => response.text())
      .then((data) => {
        contractData = JSON.parse(data);
        return resolve(contractData);
      })
      .catch((e) => {
        return reject(e);
      });
  });