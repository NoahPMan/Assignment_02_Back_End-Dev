import { Request, Response, NextFunction } from 'express';
import * as employeeService from '../services/employeeService';
import { Employee } from '../interfaces/employee';

/**
 * Handles the creation of a new employee.
 * 
 * @async
 * @param {Request} req - Express request object containing employee data in `req.body`.
 * @param {Response} res - Express response object used to send the created employee data.
 * @returns {Promise<void>} A Promise that resolves once the response is sent.
 * 
 * @throws {Error} Responds with a 400 status if an error occurs.
 * 
 * @example
 * // POST /employees
 * req.body = { name: "John Doe", position: "Developer" }
 * res.status(201).json({ id: 1, name: "John Doe", position: "Developer" })
 */
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee: Employee = req.body; 
    const newEmployee = await employeeService.createEmployee(employee); 
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

/**
 * Fetches all employees.
 * 
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to return employee data.
 * @returns {Promise<void>} A Promise that resolves once the employee list is returned.
 * 
 * @throws {Error} Responds with a 400 status if an error occurs.
 * 
 * @example
 * // GET /employees
 * res.status(200).json([{ id: 1, name: "John Doe", position: "Developer" }])
 */
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

/**
 * Retrieves a specific employee by ID.
 * 
 * @async
 * @param {Request} req - Express request object containing the employee ID in `req.params`.
 * @param {Response} res - Express response object used to return employee data.
 * @returns {Promise<void>} A Promise that resolves once the response is sent.
 * 
 * @throws {Error} Responds with a 400 status if an error occurs.
 * 
 * @example
 * // GET /employees/:id
 * req.params.id = 1
 * res.status(200).json({ id: 1, name: "John Doe", position: "Developer" })
 * res.status(404).json({ message: "Employee not found" }) // If not found
 */
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(Number(id));
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

/**
 * Updates an existing employee's details.
 * 
 * @async
 * @param {Request} req - Express request object containing the employee ID in `req.params` and updated data in `req.body`.
 * @param {Response} res - Express response object used to return updated employee data.
 * @returns {Promise<void>} A Promise that resolves once the response is sent.
 * 
 * @throws {Error} Responds with a 400 status if an error occurs.
 * 
 * @example
 * // PUT /employees/:id
 * req.params.id = 1
 * req.body = { position: "Senior Developer" }
 * res.status(200).json({ id: 1, name: "John Doe", position: "Senior Developer" })
 * res.status(404).json({ message: "Employee not found" }) // If not found
 */
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedEmployee = await employeeService.updateEmployee(Number(id), updatedData);
    if (!updatedEmployee) {
      res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

/**
 * Deletes an employee by ID.
 * 
 * @async
 * @param {Request} req - Express request object containing the employee ID in `req.params`.
 * @param {Response} res - Express response object used to confirm deletion.
 * @returns {Promise<void>} A Promise that resolves once the employee is deleted.
 * 
 * @throws {Error} Responds with a 400 status if an error occurs.
 * 
 * @example
 * // DELETE /employees/:id
 * req.params.id = 1
 * res.status(200).json({ message: "Employee deleted successfully" })
 * res.status(404).json({ message: "Employee not found" }) // If not found
 */
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await employeeService.deleteEmployee(Number(id));
    if (!deleted) {
      res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
