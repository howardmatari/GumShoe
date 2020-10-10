module.exports = function(sequelize, DataTypes) {
    let Contacts = sequelize.define("Contacts", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
         validate: {
           isEmail: true 
         }
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    
    Contacts.associate = function(models) {
        // We're saying that a Post should belong to an User
        // A Post can't be created without an User due to the foreign key constraint
        Contacts.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Contacts;
  };