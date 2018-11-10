// function rolling(lst, init){
//     return is_empty_list(lst)
//         ? []
//         : pair(head(lst) + init,
//                 rolling(tail(lst), init + head(lst)));
// }

// function generate_list_of_note(base, lst) {
//     const base_midi = letter_name_to_midi_note(base);
//     return pair(base_midi, rolling(lst, base_midi));
// }
// const c_major_scale = generate_list_of_note("C4",
//     list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2));

// function list_to_sound(lst) {
//     const empty_sound = sine_sound(0,0);
//     const list_of_freq = map(midi_note_to_frequency, lst);
//     const list_of_sounds = map(x => sine_sound(x, 0.2), list_of_freq);
//     return consecutively(list_of_sounds);
// }

// function scale(type, base) {
//     return list_to_sound(generate_list_of_note(base,
//             type === "m"
//                 ? major_scale_interval
//                 : type === "hm"
//                     ? harmonic_minor_scale_interval
//                     : melodic_minor_scale_interval));
// }

// const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
// const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);
// const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);

// // play(scale('mm', "C4"));

// // task 2

// function generate_arpeggio(base, lst) {
//     const base_midi = letter_name_to_midi_note(base);
//     return pair(base_midi, rolling(lst, base_midi));
// }

// const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);

// function first_n(lst, count) {
//             if(count === 0) {
//                 return [];
//             } else {
//                 return pair(head(lst), first_n(tail(lst), count - 1));
//             }
//         }

// function arpeggiator_notes(lst) {
//     if (length(lst) <= 4) {
//         return lst;
//     } else {
//         return append(first_n(lst, 4), arpeggiator_notes(tail(lst)));
//     }
// }

// function list_to_sound_dur(lst, dur) {
//     const empty_sound = sine_sound(0,0);
//     const list_of_freq = map(midi_note_to_frequency, lst);
//     const list_of_sounds = map(x => sine_sound(x, dur), list_of_freq);
//     return consecutively(list_of_sounds);
// }

// function arpeggiator_up(lst, dur) {
//     const notes = arpeggiator_notes(lst);
//     return list_to_sound_dur(notes, dur);
// }

// // play(arpeggiator_up(generate_arpeggio("Eb4", major_arpeggio_interval), 0.1));

// task 3

function exponential_decay(decay_time) {
    const half_life = decay_time / 4;
    return t => math_pow(0.5, t/half_life);
}

// task 4
function adsr(attack_time, decay_time, sustain_level, release_time) {
    return function(sound) {
        const ss = sound_to_sourcesound(sound);
        const w = get_wave(ss);
        const d = get_duration(ss);
        const modified_w = function (t){
            if (t <= attack_time) {
                return t / attack_time * w(t);
            } else if (t <= attack_time + decay_time){
                return w(attack_time) * 
                    (exponential_decay(decay_time))(t - attack_time) * w(t);
            } else if (t <= (d - release_time)) {
                return sustain_level * w(t);
            } else if (t <= d) {
                return sustain_level * 
                    (exponential_decay(release_time)(t - (d - release_time))) * w(t);
            } else {
                return 0;
            }
        };
        return sourcesound_to_sound(make_sourcesound(modified_w, d));
    };
}

// const sample1 = (adsr(0, 0.2, 0.1, 0.5))(sine_sound(800, 5));
// const sample2 = (adsr(0.4, 0, 1, 0.8))(sine_sound(400, 2));
// const sample3 = (adsr(0.01, 0.5, 0.5, 0.5))(sine_sound(400, 2));
// const sample4 = (adsr(0.6, 0.2, 0, 0))(sine_sound(800, 1));

// play(sample1);

// task 5
function one_one(l1, l2) { // list_of_item, list_of_function -> list_of_images
    if(length(l1) !== length(l2)) {
        return undefined;
    } else if (is_empty_list(l1)) {
        return [];
    } else {
        return pair(head(l2)(head(l1)), one_one(tail(l1), tail(l2)));
    }
}
function stacking_adsr(waveform, base_frequency, duration, list_of_envelope) {
    const len = length(list_of_envelope);
    const list_of_freq = map(x => x * base_frequency, enum_list(1, len));
    const list_of_sounds = map(x => waveform(x, duration), list_of_freq);
    const modified_list = one_one(list_of_sounds, list_of_envelope);
    return simultaneously(modified_list);
}


// const sample_bell = stacking_adsr(square_sound, 500, 2,
// list(adsr(0, 1.2, 0, 0),
// adsr(0, 1.3236, 0, 0),
// adsr(0, 1.5236, 0, 0),
// adsr(0, 1.8142, 0, 0)));

// const sample_trombone = stacking_adsr(square_sound, 250, 2,
// list(adsr(0.4, 0, 1, 0.2),
// adsr(0.6472, 1.2, 0, 0)));

const sample_piano = stacking_adsr(triangle_sound, 250, 2,
list(adsr(0, 1.03, 0, 0),
adsr(0, 0.64, 0, 0),
adsr(0, 0.4, 0, 0)));

// const sample_violin = stacking_adsr(sawtooth_sound, 500, 2,
// list(adsr(0.7, 0, 1, 0.3),
// adsr(0.7, 0, 1, 0.3),
// adsr(0.9, 0, 1, 0.3),
// adsr(0.9, 0, 1, 0.3)));

// const sample_cello = stacking_adsr(square_sound, 80, 2,
// list(adsr(0.1, 0, 1, 0.2),
// adsr(0.1, 0, 1, 0.3),
// adsr(0, 0, 0.2, 0.3)));
play(sample_piano);
