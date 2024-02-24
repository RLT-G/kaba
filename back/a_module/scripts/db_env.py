import os

def get_env_variable(env_path, variable_name):
    """Read the value of a variable from a .env file.

    Args:
        env_path (str): The path to the .env file.
        variable_name (str): The name of the variable to get.

    Returns:
        str: The value of the variable, or None if not found.
    """
    if os.path.isfile(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith(variable_name):
                    key, value = line.strip().split('=', 1)
                    return value
    return None
