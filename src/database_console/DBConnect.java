/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database_console;

import java.sql.Connection;
import java.sql.DriverManager;
/**
 *
 * @author s326lab
 */
public class DBConnect{

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String host = "jdbc:derby://localhost:1527/Employees";
        String uName = "customer";
        String uPass= " customer";
         Connection con = DriverManager.getConnection( host, customer, customer);
        
    }
    
}
