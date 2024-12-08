import boto3
import json
import os

def get_aws_session():
    return boto3.session.Session()

def get_secrets_manager_client(session):
    return session.client(
        service_name="secretsmanager",
        aws_access_key_id=os.environ["aws_access_key"],
        aws_secret_access_key=os.environ["aws_secret_key"],
        region_name=os.environ["aws_region_name"],
    )

def get_secrets(client, secret_name, file_path=".env"):
    try:
        if not secret_name:
            raise ValueError("Secret Name cannot be Null")
        
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        
        if "SecretString" in get_secret_value_response:
            secret = json.loads(get_secret_value_response["SecretString"])
            
            with open(file_path, "w") as f:
                for key, value in secret.items():
                    f.write(f"export {key}='{value}'\n")
            
            return {"status": 0, "message": "Secrets written successfully"}
    except Exception as e:
        return {"status": -1, "error": {"message": str(e)}}

def main():
    session = get_aws_session()
    client = get_secrets_manager_client(session)
    result = get_secrets(client, os.environ["aws_secret_name"])
    print(result)

if __name__ == "__main__":
    main()