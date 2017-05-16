
Set-Service sqlbrowser -StartupType auto
Start-Service sqlbrowser

[reflection.assembly]::LoadWithPartialName("Microsoft.SqlServer.Smo") | Out-Null
[reflection.assembly]::LoadWithPartialName("Microsoft.SqlServer.SqlWmiManagement") | Out-Null

$wmi = New-Object('Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer')
$tcp = $wmi.GetSmoObject("ManagedComputer[@Name='${env:computername}']/ServerInstance[@Name='SQL2016']/ServerProtocol[@Name='Tcp']")
$tcp.IsEnabled = $true
$tcp.Alter()


$config = @{
  dbOpts = @{
    instanceName = "SQL2016"
    dialect = "mssql"
    host = "localhost"
    username = "sa"
    password = "Password12!"
    port = 1433
    dialectOptions = @{
      requestTimeout = 25000
      cryptoCredentialsDetails = @{
        ciphers = "RC4-MD5"
      }
    }
    pool = @{
      max = 5
      min = 0
      idle = 10000
    }
  }
  dbs = @{
    test_db = @{
      tables = @{
        product = @{
          name = @{
            type = "string"
            primaryKey = $True
            length = 255
          }
          price = @{
            type = "decimal"
          }
          quantity = @{
            type = "integer"
          }
          xx_created_dt = @{
            type = "datetime"
            timestamp = $True
          }
          xx_modified_dt = @{
            type = "datetime"
            timestamp = $True
          }
        }
      }
    }
    test_db2 = @{
      tables = @{
        country = @{
          name = @{
            type = "string"
            primaryKey = $True
          }
          capital_city = @{
            type = "text"
          }
          language = @{
            type = "string"
            length = 255
            allowNull = $True
          }
          timezone = @{
            type = "string"
            length = 10
          }
          latitude = @{
            type = "double"
          }
          longitude = @{
            type = "double"
          }
          eu_member = @{
            type = "boolean"
          }
          pop_density_percent = @{
            type = "float"
          }
          counter = @{
            type = "integer"
            autoIncrement = $True
          }
          created_at = @{
            type = "datetime"
            length = 2
            timestamp = true
          }
        }
      }
    }
  }
}




$json = $config | ConvertTo-Json -Depth 6 -Compress

# Create sequelize_test database
sqlcmd -S "(local)" -U "sa" -P "Password12!" -d "master" -Q "CREATE DATABASE [test_db2];"

# cannot use Out-File because it outputs a BOM
[IO.File]::WriteAllLines((Join-Path $pwd "test\config\mssql.json"), $json)