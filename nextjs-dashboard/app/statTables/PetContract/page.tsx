import { Button } from "@/components/ui/button"
import { XMLParser } from 'fast-xml-parser';
import { promises as fs } from 'fs';
import Image from 'next/image';
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
import { loadPetContractFromPublic } from "@/app/lib/petContractUtils";


export default async function Page() {
  const data = await loadPetContractFromPublic()
  let bgltotal = 0
  let cstotal = 0
  let pettometotal= 0
  for ( const item of data.levels){
    if(item.Item){
      const split = item.Item.split(";")
      let beastgodlifeblood = ""
      let contractualscroll = ""
      let pettome = ""
      for(let res of split){
        let material = res.split(",")
        if(material[1] == "3533"){
          contractualscroll = material[2]
        }
        else if(material[1] == "138"){
          pettome = material[2]
        }
        else if(material[1] == "3534"){
          beastgodlifeblood = material[2]
        }
      }
      item.beastgodlifeblood = beastgodlifeblood
      item.contractualscroll =contractualscroll
      item.pettome = pettome
      bgltotal += Number(beastgodlifeblood)
      cstotal += Number(contractualscroll)
      pettometotal += Number(pettome)
    }
  }
  const levels = data.levels

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-0">
        <div className="h-screen flex flex-col">
          <div className="flex-1 bg-white mx-6 my-4 rounded-lg shadow-sm border overflow-hidden flex flex-col">
            <Table className="w-full">
              <TableHeader className="bg-gray-50/50 border-b sticky top-0 z-10">
                <TableRow className="bg-gray-50/50">
                  <TableHead className="w-16 font-semibold text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-gray-900">Level</div>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">           
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/staticons/ACC.png"
                            alt="Accuracy"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                        <div className="font-medium text-gray-900">Accuracy</div>
                      </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/staticons/Attack.png"
                            alt="Attack"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                      <div className="font-medium text-gray-900">Attack</div>
                      </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/staticons/CRIT.png"
                            alt="Crit"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                      <div className="font-medium text-gray-900">Crit</div>
                      </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/staticons/Hit_DMG.png"
                            alt="CritDamage"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                        <div className="font-medium text-gray-900">Crit Damage</div>
                      </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">
                      
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/items/item0138.png"
                            alt="PetTome"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                        <div className="font-medium text-gray-900">Pet Tome</div>
                      </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/items/item3533.png"
                            alt="ContractualScroll"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                      <div className="font-medium text-gray-900">Contractual Scroll</div>
                      </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/items/item3534.png"
                            alt="BeastGodLifeBlood"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                      <div className="font-medium text-gray-900">Beast God Lifeblood</div>
                      </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {levels.map((level) => (
                <TableRow key={level.Level}>
                  <TableCell className="font-medium">{level.Level}</TableCell>
                  <TableCell> {level.Roquet}</TableCell>
                  <TableCell>{level.Attack}</TableCell>
                  <TableCell>{level.Crit}</TableCell>
                  <TableCell>{level.Hit_DMG}</TableCell>
                  <TableCell>{level.pettome}</TableCell>
                  <TableCell>{level.contractualscroll}</TableCell>
                  <TableCell>{level.beastgodlifeblood}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell >{pettometotal}</TableCell>
              <TableCell >{cstotal}</TableCell>
              <TableCell >{bgltotal}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        </div>
      </div>
    </div>
  );
  }