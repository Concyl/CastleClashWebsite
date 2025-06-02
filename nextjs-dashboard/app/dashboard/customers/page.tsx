import { Button } from "@/components/ui/button"
import { XMLParser } from 'fast-xml-parser';
import { promises as fs } from 'fs';
import path from "path";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react";

export interface PetContractLevel {
  ID: number;
  Level: number;
  Break?: number;
  Roquet: number;
  Attack?: number;
  Crit?: number;
  Hit_DMG?: number;
  Item?: string;
  Fight: number;
}

export interface ParsedItem {
  type: number;
  id: number;
  quantity: number;
}

export interface PetContractData {
  TableName: string;
  Name: string;
  levels: PetContractLevel[];
}

// Parse item string into structured format
function parseItems(itemString?: string): ParsedItem[] {
  if (!itemString) return [];
  
  const items: ParsedItem[] = [];
  const itemPairs = itemString.split(';');
  
  for (const pair of itemPairs) {
    const parts = pair.split(',');
    if (parts.length === 3) {
      items.push({
        type: parseInt(parts[0]),
        id: parseInt(parts[1]),
        quantity: parseInt(parts[2])
      });
    }
  }
  
  return items;
}

// Main parser function
export function parsePetContractXML(xmlData: string): PetContractData {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    textNodeName: 'text',
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true
  });

  const result = parser.parse(xmlData);
  const config = result.Config;
  
  // Parse all levels
  const levels: PetContractLevel[] = [];
  
  // Handle both single item and array cases
  const listItems = Array.isArray(config.List) ? config.List : [config.List];
  
  for (const item of listItems) {
    const level: PetContractLevel = {
      ID: item.ID,
      Level: item.Level,
      Roquet: item.Roquet,
      Fight: item.Fight
    };
    
    // Add optional properties if they exist
    if (item.Break !== undefined) level.Break = item.Break;
    if (item.Attack !== undefined) level.Attack = item.Attack;
    if (item.Crit !== undefined) level.Crit = item.Crit;
    if (item.Hit_DMG !== undefined) level.Hit_DMG = item.Hit_DMG;
    if (item.Item !== undefined) level.Item = item.Item;
    
    levels.push(level);
  }

  return {
    TableName: config.TableName,
    Name: config.Name,
    levels: levels
  };
}

// Helper function to get parsed items for a specific level
export function getParsedItemsForLevel(level: PetContractLevel): ParsedItem[] {
  return parseItems(level.Item);
}


export async function loadPetContractFromPublic(filename: string = 'Pet_Contract.xml'): Promise<PetContractData> {
  try {
    // Server-side file reading    
    const filePath = path.join(process.cwd(), 'public', 'ccxmls', filename);
    const xmlData = await fs.readFile(filePath, 'utf-8');
    
    return parsePetContractXML(xmlData);
    
  } catch (error) {
    console.error('Error loading XML file from server:', error);
    throw error;
  }
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default async function Page() {
  const data = await loadPetContractFromPublic()
  const levels = data.levels
  console.log(levels)
    return (
    <div>
      <Button>abc</Button>
       <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead>Accuracy</TableHead>
          <TableHead>Attack</TableHead>
          <TableHead>Crit</TableHead>
          <TableHead>Crit Damage</TableHead>
          <TableHead className="text-center">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {levels.map((level) => (
          <TableRow key={level.Level}>
            <TableCell className="font-medium">{level.Roquet}</TableCell>
            <TableCell>{level.Roquet}</TableCell>
            <TableCell>{level.Attack}</TableCell>
            <TableCell>{level.Crit}</TableCell>
            <TableCell>{level.Hit_DMG}</TableCell>
            <TableCell className="text-center">{level.Roquet}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$3,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
  }