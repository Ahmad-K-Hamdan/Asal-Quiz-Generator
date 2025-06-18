from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient


class KeyVaultVars:
    def __init__(self, vault_name: str):
        print("Loading secrets from Azure Key Vault")
        self.vault_url = f"https://{vault_name}.vault.azure.net/"
        self.credential = DefaultAzureCredential()
        self.client = SecretClient(vault_url=self.vault_url, credential=self.credential)

        self.STORAGE_ACCOUNT_KEY = self._get_secret("STORAGE-ACCOUNT-KEY")
        self.DB_PASSWORD = self._get_secret("DB-PASSWORD")
        self.SECRET_KEY = self._get_secret("SECRET-KEY")
        self.ALGORITHM = self._get_secret("ALGORITHM")

    def _get_secret(self, name: str, quote=False) -> str:
        value = self.client.get_secret(name).value
        return f'"{value}"' if quote else value


KeyVault = KeyVaultVars(vault_name="quizgen-key")
