import Utils from "../../js/classes/Utils.js";
import npcs from "./data/npcs.json" with { type: "json" };
import interactions from "./data/interactions.json" with { type: "json" };
import { displayOnDivByid, IDS_DIVS } from "./utils.js";
import Player from "./Player.js";

/**
 * 
 * @param {Player} player 
 * @param {number[]} idsEnCounters
 * @param {number[]} idsActionsDone
 * @returns {{ id: number, name: string, role: string, beforeNpcs: number[], afterNpcs: number[], minLevelNeeded: number, afterActions: number[], }}
 */
export function getRandomNpc(player, idsEnCounters, idsActionsDone) {
    const filtered = npcs.npcs.filter(npc => {
        const hasAlreadyEncountered = idsEnCounters.includes(npc.id); // Do not play two times an interaction
        const hasMinimumLevel = player.level >= npc.minLevelNeeded // Min level needed valid
        // Every NPC before actual has been seen
        const everyNpcBeforeHimHasBeenEncountered = npc.afterNpcs.every((id) => idsEnCounters.includes(id));
        const hasEncounteredNpcsBeforeHim = npc.afterNpcs.length === 0 || (npc.afterNpcs.length === idsEnCounters.length && everyNpcBeforeHimHasBeenEncountered);
        // Every NPC after actual must not have been seen
        const everyNpcAfterHimHasBeenEncountered = npc.beforeNpcs.every((id) => idsEnCounters.includes(id));
        const hasEncounteredNpcsAfterHim = npc.beforeNpcs.length > 0 && everyNpcAfterHimHasBeenEncountered;
        // NPC might depend on previous actions
        // Check if actions from which depend NPC has been done
        const everyActionHasBeenDone = npc.afterActions.every((id) => idsActionsDone.includes(id));
        const hasDoneEveryPreviousActions = npc.afterActions.length === 0 || (npc.afterActions.length >= idsActionsDone.length && everyActionHasBeenDone);
        // Return the check of everything
        return !hasAlreadyEncountered && hasMinimumLevel && hasEncounteredNpcsBeforeHim && !hasEncounteredNpcsAfterHim && hasDoneEveryPreviousActions;
    }); // Every npc seen before has been seen
    return filtered[Utils.getRandomIndexFromArray(filtered)];
}

/**
 * Gets a random interaction from the npc with its id in argument
 * @param {number} npcId 
 * @returns {{ msg: string, idsNpcsAllowed: number[], idsUserActions: number[] }}
 */
export function getRandomInteraction(npcId) {
    const npcInteractions = interactions.interactions.filter(i => i.idsNpcsAllowed.includes(npcId));
    const index = Utils.getRandomIndexFromArray(npcInteractions);
    return npcInteractions[index];
}


/**
 * Gets the content of the interaction and display every details
 * @param {{ id: number, name: string, role: string }} npc 
 * @param {{ msg: string, idsNpcsAllowed: number[], idsUserActions: number[] }} interaction 
 * @param {string} playerName
 */
export function displayInteraction(npc, interaction, playerName){
    displayOnDivByid(IDS_DIVS.INTERATCTION.name, `You encountered ${npc.name}`);
    displayOnDivByid(IDS_DIVS.INTERATCTION.role, npc.role);
    const finalMsg = interaction.msg.replace("{{name}}", playerName);
    displayOnDivByid(IDS_DIVS.INTERATCTION.msg, finalMsg);
}