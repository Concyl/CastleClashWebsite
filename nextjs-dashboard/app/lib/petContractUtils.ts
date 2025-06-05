import { XMLParser } from 'fast-xml-parser';
import { promises as fs } from 'fs';
import path from "path";

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
  beastgodlifeblood?: string;
  contractualscroll?: string;
  pettome?: string;
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